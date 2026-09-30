export type ContentCategory = 
  | 'Main Story'
  | 'Manga'
  | 'Side Story'
  | 'EX Light Novel'
  | 'What IF'
  | 'Reference & Meta';

export interface TrackerItem {
  id: string;
  arcId: string;
  arcTitle: string;
  category: ContentCategory;
  subcategory?: string;
  title: string;
  order: number;
  highlight?: boolean; // 🟢 marked by user
  defaultCompleted?: boolean;
  defaultDate?: string;
  note?: string;
  safeToReadNotice?: string;
}

export interface UserItemState {
  completed: boolean;
  completedDate?: string;
  highlight?: boolean;
  notes?: string;
}

export interface ArcGroup {
  id: string;
  number: number | string;
  title: string;
  subtitle: string;
  icon: string;
  description?: string;
  color: string;
  badgeColor: string;
}
