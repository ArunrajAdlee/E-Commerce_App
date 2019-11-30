#SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `brand_name` varchar(255),
  `date_of_birth` date,
  `phone_number` VARCHAR(255),
  `age` integer,
  `address_id` int NOT NULL,
  `resetPasswordToken` VARCHAR(255),
  `resetPasswordExpires` DATETIME,
  `isAdmin` bool DEFAULT FALSE
);

CREATE TABLE `address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `street_name` varchar(255) NOT NULL,
  `street_number` integer NOT NULL,
  `unit_number` varchar(255),
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
);

CREATE TABLE `listings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255),
  `thumbnail` VARCHAR(255),
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock_count` int NOT NULL,
  `quantity_sold` int NOT NULL DEFAULT 0,
  `status` BOOLEAN NOT NULL,
  `user_id` int NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `category` int NOT NULL,
  `category_name` VARCHAR(255) NOT NULL
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `order` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `shipping_type` varchar(255) NOT NULL,
  `shipped_to` int NOT NULL,
  `shipping_status` varchar(255) NOT NULL,
  `total_price_before_tax` double NOT NULL,
  `total_tax` double NOT NULL,
  `total_price` double NOT NULL,
  `total_fee` double NOT NULL
  );
  
CREATE TABLE `order_details` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `buyer_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int(11) NOT NULL,
  `price_before_tax` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `price_after_tax` double DEFAULT NULL,
  `listing_fee` double DEFAULT NULL
); 


CREATE TABLE `cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `listing_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
);

CREATE TABLE `reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `seller_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `rating` int
);

CREATE TABLE `ads` (
`id` int PRIMARY KEY AUTO_INCREMENT,
`click_count` int NOT NULL DEFAULT 0
);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `cart` ADD FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`);

ALTER TABLE `order_details` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);
ALTER TABLE `order_details` ADD FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`);
ALTER TABLE `order_details` ADD FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`);

ALTER TABLE `listings` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`shipped_to`) REFERENCES `address` (`id`);

