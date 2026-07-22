import {useState} from 'react';
import {colors} from '../domain/options';
import {bars, getBar, getPlate, plates, type PlateId, type WeightSettings} from '../domain/weights';
import {CrossFitIcon} from '../components/CrossFitIcon';
import {Sheet} from '../components/Sheet';

interface EquipmentScreenProps {
  settings: WeightSettings;
  onSettingsChange: (settings: WeightSettings) => void;
}

type Selection = {kind: 'bar'} | {kind: 'plate'; plateId: PlateId};

const plateOptions = [0, 2, 4, 6, 8, 10];

export function EquipmentScreen({settings, onSettingsChange}: EquipmentScreenProps) {
  const [selection, setSelection] = useState<Selection | null>(null);

  const updatePlateAvailability = (plateId: PlateId, availability: number) => {
    onSettingsChange({
      ...settings,
      availablePlates: settings.availablePlates.map(item =>
        item.plateId === plateId ? {...item, availability} : item,
      ),
    });
    setSelection(null);
  };

  return (
    <section className="equipment-screen" aria-label="Equipment settings">
      <div className="settings-section">
        <h2>Bar</h2>
        <button className="settings-row" type="button" onClick={() => setSelection({kind: 'bar'})}>
          <CrossFitIcon name="barbell" color={colors.bar} size={38} />
          <span>Bar Weight</span>
          <strong>{getBar(settings).name}</strong>
          <span className="chevron" aria-hidden="true">
            ›
          </span>
        </button>
      </div>

      <div className="settings-section">
        <h2>Available Plates</h2>
        {plates.map(plate => {
          const availability = settings.availablePlates.find(item => item.plateId === plate.id)?.availability ?? 0;
          return (
            <button
              className="settings-row"
              type="button"
              key={plate.id}
              onClick={() => setSelection({kind: 'plate', plateId: plate.id})}
            >
              <CrossFitIcon name="plate" color={plate.color} size={plate.size} />
              <span>
                {plate.kg}kg/{plate.lb}lb
              </span>
              <strong>{availability}</strong>
              <span className="chevron" aria-hidden="true">
                ›
              </span>
            </button>
          );
        })}
      </div>

      {selection?.kind === 'bar' && (
        <Sheet title="Bar Weight" onClose={() => setSelection(null)}>
          <div className="selection-list">
            {bars.map(bar => (
              <button
                className="selection-row"
                type="button"
                key={bar.id}
                onClick={() => {
                  onSettingsChange({...settings, barId: bar.id});
                  setSelection(null);
                }}
              >
                <span className="selection-primary">{bar.name}</span>
                {bar.id === settings.barId && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </Sheet>
      )}

      {selection?.kind === 'plate' && (
        <PlateAvailabilitySheet
          plateId={selection.plateId}
          current={settings.availablePlates.find(item => item.plateId === selection.plateId)?.availability ?? 0}
          onSelect={availability => updatePlateAvailability(selection.plateId, availability)}
          onClose={() => setSelection(null)}
        />
      )}
    </section>
  );
}

interface PlateAvailabilitySheetProps {
  plateId: PlateId;
  current: number;
  onSelect: (availability: number) => void;
  onClose: () => void;
}

function PlateAvailabilitySheet({plateId, current, onSelect, onClose}: PlateAvailabilitySheetProps) {
  const plate = getPlate(plateId);
  return (
    <Sheet title={`${plate.kg}kg / ${plate.lb}lb plates`} onClose={onClose}>
      <div className="selection-list">
        {plateOptions.map(option => (
          <button className="selection-row" type="button" key={option} onClick={() => onSelect(option)}>
            <span className="selection-primary">{option}</span>
            {option === current && <span className="checkmark">✓</span>}
          </button>
        ))}
      </div>
    </Sheet>
  );
}
