CREATE TABLE `resolver`.`organization` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `mobile_number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `mobile_number_UNIQUE` (`mobile_number` ASC) VISIBLE);

CREATE TABLE `resolver`.`employee` (
  `empid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `mobile_number` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NULL,
  `organization_id` INT NULL,
  PRIMARY KEY (`empid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `mobile_number_UNIQUE` (`mobile_number` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  INDEX `organization_id_idx` (`organization_id` ASC) VISIBLE,
  CONSTRAINT `organization_id`
    FOREIGN KEY (`organization_id`)
    REFERENCES `resolver`.`organization` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `resolver`.`project` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL,
  `status` VARCHAR(45) NOT NULL,
  `organization_id` INT NULL,
  PRIMARY KEY (`pid`),
  INDEX `organization_id_idx` (`organization_id` ASC) VISIBLE,
  CONSTRAINT `project_organization_id`
    FOREIGN KEY (`organization_id`)
    REFERENCES `resolver`.`organization` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `resolver`.`ticket` (
  `tid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `summary` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `priority` VARCHAR(45) NOT NULL,
  `raised_date` DATETIME NOT NULL,
  `close_date` DATETIME NULL,
  `project_id` INT NULL,
  PRIMARY KEY (`tid`),
  INDEX `ticket_project_id_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `ticket_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `resolver`.`project` (`pid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `resolver`.`project_assign` (
  `assign_id` INT NOT NULL AUTO_INCREMENT,
  `pid` INT NULL,
  `eid` INT NULL,
  `assigned_on` DATETIME NULL,
  PRIMARY KEY (`assign_id`),
  INDEX `assign_project_id_idx` (`pid` ASC) VISIBLE,
  INDEX `assign_employee_id_idx` (`eid` ASC) VISIBLE,
  CONSTRAINT `assign_project_id`
    FOREIGN KEY (`pid`)
    REFERENCES `resolver`.`project` (`pid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `assign_employee_id`
    FOREIGN KEY (`eid`)
    REFERENCES `resolver`.`employee` (`empid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
