export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  segment: string;
};

export type Shipment = {
  id: string;
  waybill_id: string;
  customer_id: string;
  origin: string;
  destination: string;
  service_type: string;
  current_status: ShipmentStatus;
  created_at?: string;
};

export type ShipmentStatus =
  | "booked"
  | "picked_up"
  | "in_transit"
  | "customs_hold"
  | "failed_attempt"
  | "delivered";

export type ShipmentEvent = {
  id: string;
  shipment_id: string;
  event_type: string;
  location: string;
  timestamp: string;
};

export type Ticket = {
  id: string;
  shipment_id: string;
  issue_type: string;
  severity: string;
  status: string;
  created_at?: string;
};

export type Lead = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  cargo_details: string;
  status: string;
  created_at?: string;
};
