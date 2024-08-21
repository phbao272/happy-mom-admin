export interface IUserShipment {
  id: number;

  package_code?: string;

  cn_tracking_number: string;
  cn_product_name?: string;
  vn_product_name?: string;
  item_type?: string;
  quantity?: number;
  weight?: number;
  status: string;
  note?: string;
  cn_warehouse_at?: string;
  dispatched_at?: string;
  vn_warehouse_at?: string;
  in_transit_vn_at?: string;

  mine?: boolean;
  isDisableAction?: boolean;

  created_at: string;
  updated_at: string;

  receiver: {
    email: string;
  };
}

export interface IShipmentHistory {
  id: number;
  shipment_id: number;
  status: string;
  note?: string;
  created_at: string;

  shipment: {
    cn_tracking_number: string;
  };
}

export interface IBlockedShipmentHistory {
  id: number;
  shipment_id: number;
  status: string;
  note?: string;
  created_at: string;

  shipment: {
    cn_tracking_number: string;
  };
}

export interface IPackage {
  id: string;
  package_number: number;
  created_at: string;
  customer: string;
  actual_weight: number;

  status: string;

  shipments: IUserShipment[];
}
