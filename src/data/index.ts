import { arcs1to3Items } from './arcs1to3';
import { arcs4to6Items } from './arcs4to6';
import { arcs7to10Items } from './arcs7to10';
import { whatIfAndRefsItems } from './whatIfAndRefs';
import { TrackerItem } from '../types/tracker';

export const ALL_TRACKER_ITEMS: TrackerItem[] = [
  ...arcs1to3Items,
  ...arcs4to6Items,
  ...arcs7to10Items,
  ...whatIfAndRefsItems,
];

export { ARC_GROUPS } from './arcs';
