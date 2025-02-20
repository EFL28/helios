import { Partido } from '@/types/quiniela.types';
import NormalPredictionWidget from './NormalPredictionWidget';
import ResultPredictionWidget from './ResultPredictionWidget';

interface QuinielaWidgetProps {
  partido: Partido;
  isLastMatch?: boolean;
  predictions?: string[];
}

export default function QuinielaWidget({
  partido,
  isLastMatch = false,
  predictions = [],
}: QuinielaWidgetProps) {
  if (isLastMatch) {
    return <ResultPredictionWidget partido={partido} />;
  }

  return <NormalPredictionWidget partido={partido} />;
}
