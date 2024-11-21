// Form dan Table
export interface Field {
  name: string;
  label: string;
  type: string;
  options?: string[];
  validation: any;
}
export interface FormConfig {
  fields: Field[];
  initialData?: any;
  onSubmit?: (values: any) => void;
}

// CALENDAR
export interface Events {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  color: string;
  resourceId?: any;
}
//
