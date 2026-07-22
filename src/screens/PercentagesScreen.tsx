import {useRef, useState, type PointerEvent as ReactPointerEvent} from 'react';
import {formatWeightUnit} from '../domain/conversion';
import {type ConversionConfiguration} from '../domain/options';
import {getWeightPercentages, type WeightPercentage, type WeightSettings} from '../domain/weights';
import {PlateSummary} from '../components/PlateDisplay';
import {PlusIcon, TrashIcon} from '../components/UiIcons';

interface PercentagesScreenProps {
  configuration: ConversionConfiguration;
  settings: WeightSettings;
  percentages: number[];
  onPercentagesChange: (percentages: number[]) => void;
}

const DELETE_ACTION_WIDTH = 76;

export function PercentagesScreen({configuration, settings, percentages, onPercentagesChange}: PercentagesScreenProps) {
  const [newPercentage, setNewPercentage] = useState('');
  const [openPercentage, setOpenPercentage] = useState<number | null>(null);
  const calculated = getWeightPercentages(configuration, percentages);

  const addPercentage = () => {
    if (!newPercentage) {
      return;
    }
    const percentage = Number(newPercentage);
    if (!Number.isFinite(percentage) || percentages.includes(percentage)) {
      setNewPercentage('');
      return;
    }
    onPercentagesChange([...percentages, percentage].sort((left, right) => right - left));
    setNewPercentage('');
  };

  const deletePercentage = (percentage: number) => {
    onPercentagesChange(percentages.filter(value => value !== percentage));
    setOpenPercentage(null);
  };

  return (
    <section className="percentages-screen" aria-label="Weight percentages">
      <div className="percentage-list">
        {calculated.map(item => (
          <SwipeablePercentageRow
            key={item.percentage}
            item={item}
            settings={settings}
            open={openPercentage === item.percentage}
            onOpen={() => setOpenPercentage(item.percentage)}
            onClose={() => setOpenPercentage(null)}
            onDelete={() => deletePercentage(item.percentage)}
          />
        ))}
        {calculated.length === 0 && <p className="empty-state">Add a percentage below.</p>}
      </div>
      <form
        className="percentage-controls"
        onSubmit={event => {
          event.preventDefault();
          addPercentage();
        }}
      >
        <label>
          <span className="sr-only">Percentage to add</span>
          <input
            aria-label="Percentage to add"
            inputMode="numeric"
            maxLength={4}
            placeholder="%"
            value={newPercentage}
            onChange={event => setNewPercentage(event.target.value.replace(/[^0-9]/g, ''))}
          />
        </label>
        <button type="submit" aria-label="Add percentage">
          <PlusIcon className="plus-icon" />
        </button>
      </form>
    </section>
  );
}

interface SwipeablePercentageRowProps {
  item: WeightPercentage;
  settings: WeightSettings;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
}

function SwipeablePercentageRow({item, settings, open, onOpen, onClose, onDelete}: SwipeablePercentageRowProps) {
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const startPosition = useRef({x: 0, y: 0});
  const currentOffset = useRef(0);
  const gestureAxis = useRef<'horizontal' | 'vertical' | null>(null);
  const dragged = useRef(false);
  const offset = dragOffset ?? (open ? -DELETE_ACTION_WIDTH : 0);

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    startPosition.current = {x: event.clientX, y: event.clientY};
    currentOffset.current = open ? -DELETE_ACTION_WIDTH : 0;
    gestureAxis.current = null;
    dragged.current = false;
    setDragOffset(currentOffset.current);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragOffset === null) {
      return;
    }
    const deltaX = event.clientX - startPosition.current.x;
    const deltaY = event.clientY - startPosition.current.y;
    if (!gestureAxis.current && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      gestureAxis.current = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
      if (gestureAxis.current === 'horizontal') {
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }
    }
    if (gestureAxis.current !== 'horizontal') {
      return;
    }
    dragged.current = true;
    currentOffset.current = Math.max(-DELETE_ACTION_WIDTH, Math.min(0, (open ? -DELETE_ACTION_WIDTH : 0) + deltaX));
    setDragOffset(currentOffset.current);
  };

  const finishGesture = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (gestureAxis.current === 'horizontal') {
      if (currentOffset.current <= -DELETE_ACTION_WIDTH / 2) {
        onOpen();
      } else {
        onClose();
      }
    }
    setDragOffset(null);
    gestureAxis.current = null;
  };

  return (
    <div className="swipe-row">
      <button
        className="swipe-delete"
        type="button"
        aria-label={`Delete ${item.percentage} percent`}
        onFocus={onOpen}
        onClick={onDelete}
      >
        <TrashIcon className="swipe-delete-icon" />
        <span>Delete</span>
      </button>
      <article
        className={`percentage-row swipe-row-front ${dragOffset !== null ? 'is-dragging' : ''}`}
        style={{transform: `translateX(${offset}px)`}}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishGesture}
        onPointerCancel={finishGesture}
        onClickCapture={event => {
          if (dragged.current) {
            event.preventDefault();
            event.stopPropagation();
            dragged.current = false;
          }
        }}
      >
        <strong className="percentage-number">{item.percentage}%</strong>
        <div className="percentage-values">
          <p>
            {item.conversion.fromWeight}
            {formatWeightUnit(item.conversion.fromUnit)}
            <span className="muted"> / </span>
            <span className="muted">
              {item.conversion.toWeight}
              {formatWeightUnit(item.conversion.toUnit)}
            </span>
          </p>
          <PlateSummary settings={settings} weight={item.conversion.fromWeight} unit={item.conversion.fromUnit} />
        </div>
      </article>
    </div>
  );
}
