import {useState} from 'react';
import {formatWeightUnit, WeightUnit} from '../domain/conversion';
import {colors} from '../domain/options';
import {
  getBar,
  PlateDistributor,
  type PlateDistribution,
  type PlateGroup,
  type WeightSettings,
} from '../domain/weights';
import {CrossFitIcon} from './CrossFitIcon';
import {Sheet} from './Sheet';

interface PlateSummaryProps {
  settings: WeightSettings;
  weight: number;
  unit: WeightUnit;
  compact?: boolean;
}

export function PlateSummary({settings, weight, unit, compact = false}: PlateSummaryProps) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const distribution = new PlateDistributor(settings, unit).getPlateDistribution(weight);
  const bar = getBar(settings);
  const barWeight = unit === WeightUnit.Kilogram ? bar.kg : bar.lb;
  const groups = distribution.getPlateGroups();
  const maxGroups = compact ? 3 : distribution.completelyDistributed ? 5 : 4;

  return (
    <>
      <button
        className="plate-summary"
        type="button"
        disabled={weight <= barWeight}
        onClick={() => setDetailsVisible(true)}
        aria-label={`Show plate distribution for ${weight}${formatWeightUnit(unit)}`}
      >
        {!distribution.completelyDistributed && (
          <span className="distribution-warning" title="Not enough plates">
            !
          </span>
        )}
        {groups.slice(0, maxGroups).map(group => (
          <PlateChip key={group.definition.id} group={group} />
        ))}
        {groups.length > maxGroups && <span className="more-plates">...</span>}
      </button>
      {detailsVisible && (
        <PlateDetails
          distribution={distribution}
          settings={settings}
          unit={unit}
          onClose={() => setDetailsVisible(false)}
        />
      )}
    </>
  );
}

function PlateChip({group}: {group: PlateGroup}) {
  return (
    <span className="plate-chip">
      <CrossFitIcon name="plate" color={group.definition.color} size={group.definition.size} />
      <span className="plate-count">{group.amount}</span>
    </span>
  );
}

interface PlateDetailsProps {
  distribution: PlateDistribution;
  settings: WeightSettings;
  unit: WeightUnit;
  onClose: () => void;
}

function PlateDetails({distribution, settings, unit, onClose}: PlateDetailsProps) {
  const bar = getBar(settings);
  return (
    <Sheet title="Load the bar" onClose={onClose}>
      {!distribution.completelyDistributed && (
        <div className="plate-detail-row warning-row">
          <span className="warning-symbol">!</span>
          <strong>Not enough plates</strong>
        </div>
      )}
      <div className="plate-detail-row">
        <CrossFitIcon name="barbell" color={colors.bar} size={38} />
        <span>{unit === WeightUnit.Kilogram ? `${bar.kg}kg` : `${bar.lb}lb`}</span>
      </div>
      {distribution.getPlateGroups().map(group => (
        <div className="plate-detail-row" key={group.definition.id}>
          <CrossFitIcon name="plate" color={group.definition.color} size={group.definition.size} />
          <strong>{group.amount}x</strong>
          <span>{unit === WeightUnit.Kilogram ? `${group.definition.kg}kg` : `${group.definition.lb}lb`}</span>
        </div>
      ))}
    </Sheet>
  );
}
