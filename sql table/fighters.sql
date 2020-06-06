CREATE TABLE `heroku_caa96027b4bab9a`.`fighters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `age` INT NOT NULL,
  `info` VARCHAR(150) NOT NULL,
  `wins` INT NOT NULL,
  `loss` INT NOT NULL,
  `image` LONGBLOB NOT NULL,
  PRIMARY KEY (`id`));