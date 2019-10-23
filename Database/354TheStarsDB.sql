/*
	Name: Team Awesome
	Date: 10/23/2019
    Purpose: Create Database for e-commerce site. Comp 354 Project
*/

CREATE TABLE `Client` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `brand_name` varchar(255),
  `date_of_birth` date,
  `phone_number` integer,
  -- `age` integer,
  `created_at` timestamp
);

CREATE TABLE `Review` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `listing_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `rating` integer NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `Listing` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock_count` int NOT NULL,
  `quantity_sold` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `Categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `Order` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `shipping_type` varchar(255),
  `shipped_to` varchar(255),
  `shipping_status` varchar(255),
  `total_price_before_tax` double,
  `total_tax` double,
  `total_price` double,
  `total_fee` double
);

-- Changed Cart
CREATE TABLE `Cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `listing_id` int,
  `client_id` int NOT NULL,
  `quantity` int 
  
  -- Removed since for cart we only need price before tax, and it can be calculated from adding listing_id prices in the backend. But Feel Free to add back if you think necessary
  /*`price_before_tax` double,
  `tax` double,
  `price_after_tax` double,
  `listing_fee` double */
);

-- New Table Added. Stores the details for each order
CREATE TABLE `OrderDetails` (
	`id` int PRIMARY KEY AUTO_INCREMENT,
	`order_id` int,
	`buyer_id` int NOT NULL,
	`listing_id` int NOT NULL,
	`seller_id` int NOT NULL,
    `purchase_date` timestamp,
	`quantity` int NOT NULL,
	`price_before_tax` double,
	`tax` double,
	`price_after_tax` double,
	`listing_fee` double
);

/*
CREATE TABLE `ClientLivesAt` (
  `client_id` int PRIMARY KEY,
  `address_id` int PRIMARY KEY
);
*/

CREATE TABLE `CategorizedAs` (
	`id` int PRIMARY KEY AUTO_INCREMENT,
	`listing_id` int NOT NULL,
	`category_id` int NOT NULL
);

CREATE TABLE `Address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `street_name` varchar(255) NOT NULL,
  `street_number` integer NOT NULL,
  `unit_number` varchar(255),
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  -- added
  `client_id` int NOT NULL
);


/* FOREIGN KEYS */

ALTER TABLE `Review` ADD FOREIGN KEY (`client_id`) REFERENCES `Client` (`id`);
ALTER TABLE `Review` ADD FOREIGN KEY (`listing_id`) REFERENCES `Listing` (`id`);

ALTER TABLE `Address` ADD FOREIGN KEY (`client_id`) REFERENCES `Client` (`id`);
-- ALTER TABLE `ClientLivesAt` ADD FOREIGN KEY (`address_id`) REFERENCES `Address` (`id`);

ALTER TABLE `CategorizedAs` ADD FOREIGN KEY (`listing_id`) REFERENCES `Listing` (`id`);
ALTER TABLE `CategorizedAs` ADD FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`);

-- New Foreign Key added for Cart to Client
ALTER TABLE `Cart` ADD FOREIGN KEY (`client_id`) REFERENCES `Client` (`id`);
ALTER TABLE `Cart` ADD FOREIGN KEY (`listing_id`) REFERENCES `Listing` (`id`);

-- New Foreign keys added for OrderDetails to Listing, Client, and Order
ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`);
ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`buyer_id`) REFERENCES `Client` (`id`);
ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`seller_id`) REFERENCES `Client` (`id`);


ALTER TABLE `Listing` ADD FOREIGN KEY (`client_id`) REFERENCES `Client` (`id`);

ALTER TABLE `Order` ADD FOREIGN KEY (`shipped_to`) REFERENCES `Address` (`id`);

/* TRIGGERS */




