import {useEffect, useState, type PointerEvent as ReactPointerEvent} from 'react';
import {colors, configurationTitle, type ConversionConfiguration} from './domain/options';
import {type WeightSettings} from './domain/weights';
import {loadPercentages, loadWeightSettings, storePercentages, storeWeightSettings} from './storage';
import {CrossFitIcon} from './components/CrossFitIcon';
import {TrashIcon} from './components/UiIcons';
import {ConverterScreen} from './screens/ConverterScreen';
import {EquipmentScreen} from './screens/EquipmentScreen';
import {PercentagesScreen} from './screens/PercentagesScreen';
import {useVisualViewport} from './useVisualViewport';

type Screen = 'convert' | 'equipment' | 'percentages';

const initialConfiguration: ConversionConfiguration = {
  unit: 'cal',
  value: '',
  fromId: 'row',
};

export default function App() {
  useVisualViewport();
  const [screen, setScreen] = useState<Screen>('convert');
  const [configuration, setConfiguration] = useState(initialConfiguration);
  const [settings, setSettings] = useState<WeightSettings>(loadWeightSettings);
  const [percentages, setPercentages] = useState<number[]>(loadPercentages);

  useEffect(() => {
    storeWeightSettings(settings);
  }, [settings]);

  useEffect(() => {
    storePercentages(percentages);
  }, [percentages]);

  const clearPercentages = () => {
    if (percentages.length > 0 && window.confirm('Do you want to clear all percentages?')) {
      setPercentages([]);
    }
  };

  const blurInputOnOutsideTap = (event: ReactPointerEvent<HTMLDivElement>) => {
    const focused = document.activeElement;
    if (focused instanceof HTMLInputElement && event.target !== focused) {
      focused.blur();
    }
  };

  return (
    <div
      className={`app-shell ${screen === 'percentages' ? 'without-tabs' : ''}`}
      onPointerDown={blurInputOnOutsideTap}
    >
      <header className="app-header">
        {screen === 'percentages' ? (
          <button
            className="header-action back-button"
            type="button"
            onClick={() => setScreen('convert')}
            aria-label="Back"
          >
            ‹
          </button>
        ) : (
          <span className="header-spacer" />
        )}
        <h1>
          {screen === 'convert'
            ? '3,2,1...GO'
            : screen === 'equipment'
              ? 'Equipment'
              : configurationTitle(configuration)}
        </h1>
        {screen === 'percentages' ? (
          <button
            className="header-action clear-button"
            type="button"
            onClick={clearPercentages}
            aria-label="Clear percentages"
            disabled={percentages.length === 0}
          >
            <TrashIcon className="trash-icon" />
          </button>
        ) : (
          <span className="header-spacer" />
        )}
      </header>

      <main className="screen-content">
        {screen === 'convert' && (
          <ConverterScreen
            configuration={configuration}
            settings={settings}
            onConfigurationChange={setConfiguration}
            onOpenPercentages={() => setScreen('percentages')}
          />
        )}
        {screen === 'equipment' && <EquipmentScreen settings={settings} onSettingsChange={setSettings} />}
        {screen === 'percentages' && (
          <PercentagesScreen
            configuration={configuration}
            settings={settings}
            percentages={percentages}
            onPercentagesChange={setPercentages}
          />
        )}
      </main>

      {screen !== 'percentages' && (
        <nav className="bottom-nav" aria-label="Primary navigation">
          <button
            type="button"
            className={screen === 'convert' ? 'active' : ''}
            onClick={() => setScreen('convert')}
            aria-current={screen === 'convert' ? 'page' : undefined}
          >
            <CrossFitIcon name="distance" color={screen === 'convert' ? colors.base : '#86858a'} size={25} />
            <span>Convert</span>
          </button>
          <button
            type="button"
            className={screen === 'equipment' ? 'active' : ''}
            onClick={() => setScreen('equipment')}
            aria-current={screen === 'equipment' ? 'page' : undefined}
          >
            <CrossFitIcon name="plate" color={screen === 'equipment' ? colors.base : '#86858a'} size={25} />
            <span>Equipment</span>
          </button>
        </nav>
      )}
    </div>
  );
}
