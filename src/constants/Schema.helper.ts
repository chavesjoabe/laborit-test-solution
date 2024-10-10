export const SchemaHelper = `
CREATE TABLE my_table (
  id INT PRIMARY KEY,
  company VARCHAR(255),
  last_name VARCHAR(255),
  first_name VARCHAR(255),
  email_address VARCHAR(255),
  job_title VARCHAR(255),
  business_phone VARCHAR(50),
  home_phone VARCHAR(50),
  mobile_phone VARCHAR(50),
  fax_number VARCHAR(50),
  address VARCHAR(255),
  city VARCHAR(100),
  state_province VARCHAR(100),
  zip_postal_code VARCHAR(20),
  country_region VARCHAR(100),
  web_page VARCHAR(255),
  notes TEXT,
  attachments BLOB
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  employee_id INT,
  customer_id INT,
  order_date DATE,
  shipped_date DATE,
  shipper_id INT,
  ship_name VARCHAR(255),
  ship_address VARCHAR(255),
  ship_city VARCHAR(100),
  ship_state_province VARCHAR(100),
  ship_zip_postal_code VARCHAR(20),
  ship_country_region VARCHAR(100),
  shipping_fee DECIMAL(10, 2),
  taxes DECIMAL(10, 2),
  payment_type VARCHAR(50),
  paid_date DATE,
  notes TEXT,
  tax_rate DECIMAL(5, 2),
  tax_status_id INT,
  status_id INT
);

CREATE TABLE products (
  supplier_ids INT,
  id INT PRIMARY KEY,
  product_code VARCHAR(255),
  product_name VARCHAR(255),
  description TEXT,
  standard_cost DECIMAL(10, 2),
  list_price DECIMAL(10, 2),
  reorder_level INT,
  target_level INT,
  quantity_per_unit VARCHAR(255),
  discontinued BOOLEAN,
  minimum_reorder_quantity INT,
  category VARCHAR(255),
  attachments BLOB
);
`;
