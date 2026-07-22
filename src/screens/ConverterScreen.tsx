import {useMemo, useState} from 'react';
import {
  colors,
  fromOptions,
  getConversions,
  getOption,
  units,
  type ConversionConfiguration,
  type ConvertedOption,
  type OptionId,
  type UnitKey,
} from '../domain/options';
import {getWeightPercentages, type WeightSettings} from '../domain/weights';
import {CrossFitIcon} from '../components/CrossFitIcon';
import {PlateSummary} from '../components/PlateDisplay';
import {Sheet} from '../components/Sheet';

interface ConverterScreenProps {
  configuration: ConversionConfiguration;
  settings: WeightSettings;
  onConfigurationChange: (configuration: ConversionConfiguration) => void;
  onOpenPercentages: () => void;
}

export function ConverterScreen({
  configuration,
  settings,
  onConfigurationChange,
  onOpenPercentages,
}: ConverterScreenProps) {
  const [unitSheetVisible, setUnitSheetVisible] = useState(false);
  const [movementSheetVisible, setMovementSheetVisible] = useState(false);
  const selectedOption = getOption(configuration.fromId);
  const availableFromOptions = fromOptions(configuration.unit);
  const conversions = useMemo(() => getConversions(configuration), [configuration]);

  const selectUnit = (unit: UnitKey) => {
    const options = fromOptions(unit);
    const fromId = options.some(option => option.id === configuration.fromId) ? configuration.fromId : options[0].id;
    onConfigurationChange({...configuration, unit, fromId});
    setUnitSheetVisible(false);
  };

  const selectMovement = (fromId: OptionId) => {
    onConfigurationChange({...configuration, fromId});
    setMovementSheetVisible(false);
  };

  return (
    <section className="converter-screen" aria-label="Fitness converter">
      <div className="result-list" aria-live="polite">
        {conversions.map(converted =>
          converted.option.kind === 'weight' ? (
            <WeightResult
              key={converted.option.id}
              converted={converted}
              configuration={configuration}
              settings={settings}
              onOpenPercentages={onOpenPercentages}
            />
          ) : (
            <ConversionResultRow key={converted.option.id} converted={converted} />
          ),
        )}
      </div>

      <div className="conversion-controls" style={{borderColor: selectedOption.color}}>
        <label className="value-field">
          <span className="sr-only">Value to convert</span>
          <input
            aria-label="Value to convert"
            inputMode="decimal"
            maxLength={4}
            placeholder="0"
            value={configuration.value}
            onFocus={() => {
              if (configuration.value === '0') {
                onConfigurationChange({...configuration, value: ''});
              }
            }}
            onChange={event => {
              const value = event.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
              onConfigurationChange({...configuration, value});
            }}
          />
        </label>
        <button className="unit-button" type="button" onClick={() => setUnitSheetVisible(true)}>
          {configuration.unit}
          <span className="chevron-down" aria-hidden="true" />
        </button>
        <button
          className="movement-button"
          type="button"
          disabled={availableFromOptions.length <= 1}
          onClick={() => setMovementSheetVisible(true)}
          aria-label={`Convert from ${selectedOption.title}`}
          aria-haspopup={availableFromOptions.length > 1 ? 'dialog' : undefined}
        >
          <CrossFitIcon name={selectedOption.icon} color={selectedOption.color} size={37} />
        </button>
      </div>

      {unitSheetVisible && (
        <Sheet title="Choose a unit" onClose={() => setUnitSheetVisible(false)}>
          <div className="selection-list">
            {units.map(unit => (
              <button className="selection-row" type="button" key={unit.id} onClick={() => selectUnit(unit.id)}>
                <span className="selection-primary">{unit.id}</span>
                <span className="selection-secondary">{unit.label}</span>
                {unit.id === configuration.unit && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </Sheet>
      )}

      {movementSheetVisible && (
        <Sheet title="Convert from" onClose={() => setMovementSheetVisible(false)}>
          <div className="selection-list">
            {availableFromOptions.map(option => (
              <button
                className="selection-row movement-row"
                type="button"
                key={option.id}
                onClick={() => selectMovement(option.id)}
              >
                <span className="icon-disc" style={{backgroundColor: option.color}}>
                  <CrossFitIcon name={option.icon} color="#fff" size={31} />
                </span>
                <span className="selection-primary">{option.title}</span>
                {option.id === configuration.fromId && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </Sheet>
      )}
    </section>
  );
}

function ConversionResultRow({converted}: {converted: ConvertedOption}) {
  return (
    <article className="result-row">
      <CrossFitIcon name={converted.option.icon} color={converted.option.color} size={38} />
      <h2 style={{color: converted.option.color}}>{converted.option.title}</h2>
      <p className="conversion-value">
        {converted.results.map((result, index) => (
          <span key={`${result.unit}-${index}`}>
            {index > 0 && <span className="slash"> / </span>}
            {result.value}
            <span className="result-unit">{result.unit}</span>
          </span>
        ))}
      </p>
    </article>
  );
}

interface WeightResultProps {
  converted: ConvertedOption;
  configuration: ConversionConfiguration;
  settings: WeightSettings;
  onOpenPercentages: () => void;
}

function WeightResult({converted, configuration, settings, onOpenPercentages}: WeightResultProps) {
  const percentage = getWeightPercentages(configuration, [100])[0];
  const convertedWeight = percentage.conversion.onlyTo();
  return (
    <>
      <article className="result-row weight-result">
        <CrossFitIcon name="barbell" color={colors.bar} size={40} />
        <p className="conversion-value weight-value">
          {converted.results[0].value}
          <span className="result-unit">{converted.results[0].unit}</span>
        </p>
        <PlateSummary settings={settings} weight={convertedWeight.fromWeight} unit={convertedWeight.fromUnit} compact />
      </article>
      <button className="result-row percentage-link" type="button" onClick={onOpenPercentages}>
        <span className="stacked-plates" aria-hidden="true">
          <CrossFitIcon name="plate" color="#36aa40" size={34} />
          <CrossFitIcon name="plate" color="#33618f" size={34} />
          <CrossFitIcon name="plate" color="#e8ae28" size={34} />
        </span>
        <span className="percentage-label">
          % of {configuration.value || '0'}
          {configuration.unit}
        </span>
        <span className="chevron" aria-hidden="true">
          ›
        </span>
      </button>
    </>
  );
}
