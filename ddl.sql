-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema CMPE_282
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CMPE_282
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CMPE_282` DEFAULT CHARACTER SET latin1 ;
USE `CMPE_282` ;

-- -----------------------------------------------------
-- Table `CMPE_282`.`userauthenticate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`userauthenticate` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`userauthenticate` (
  `userid` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(50) NULL DEFAULT NULL,
  `approved` TINYINT(1) NULL DEFAULT '0',
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  `lastlogin` DATETIME NULL DEFAULT NULL,
  `salt` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE UNIQUE INDEX `uc_username` ON `CMPE_282`.`userauthenticate` (`username` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`certifications`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`certifications` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`certifications` (
  `userid` INT(11) NOT NULL,
  `cname` VARCHAR(50) NULL DEFAULT NULL,
  `cauthority` VARCHAR(50) NULL DEFAULT NULL,
  `clicensenumber` VARCHAR(50) NULL DEFAULT NULL,
  `curl` VARCHAR(50) NULL DEFAULT NULL,
  `cstartdate` DATE NULL DEFAULT NULL,
  `cenddate` DATE NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `certifications_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`certifications` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`posts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`posts` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`posts` (
  `userid` INT(11) NOT NULL,
  `postid` INT(11) NOT NULL,
  `postheadline` VARCHAR(25) NULL DEFAULT NULL,
  `postbody` VARCHAR(1000) NULL DEFAULT NULL,
  `likes` INT(11) NULL DEFAULT '0',
  `comments` INT(11) NULL DEFAULT '0',
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`postid`),
  CONSTRAINT `posts_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`posts` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`comments` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`comments` (
  `postid` INT(11) NOT NULL,
  `commentid` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `commentbody` VARCHAR(250) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`),
  CONSTRAINT `comments_ibfk_2`
    FOREIGN KEY (`postid`)
    REFERENCES `CMPE_282`.`posts` (`postid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`comments` (`userid` ASC);

CREATE INDEX `fk_postid` ON `CMPE_282`.`comments` (`postid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`education`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`education` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`education` (
  `userid` INT(11) NOT NULL,
  `educationid` INT(11) NOT NULL AUTO_INCREMENT,
  `school` VARCHAR(50) NULL DEFAULT NULL,
  `startdate` DATE NULL DEFAULT NULL,
  `enddate` DATE NULL DEFAULT NULL,
  `currentlydoing` TINYINT(1) NULL DEFAULT '0',
  `degree` VARCHAR(50) NULL DEFAULT NULL,
  `field` VARCHAR(50) NULL DEFAULT NULL,
  `grade` DECIMAL(4,1) NULL DEFAULT NULL,
  `activities` VARCHAR(250) NULL DEFAULT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`educationid`),
  CONSTRAINT `education_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `education_ibfk_1` ON `CMPE_282`.`education` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`courses` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`courses` (
  `userid` INT(11) NOT NULL,
  `educationid` INT(11) NOT NULL,
  `coursename` VARCHAR(50) NULL DEFAULT NULL,
  `courseid` VARCHAR(15) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `courses_ibfk_1`
    FOREIGN KEY (`userid` , `educationid`)
    REFERENCES `CMPE_282`.`education` (`userid` , `educationid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_educationid` ON `CMPE_282`.`courses` (`userid` ASC, `educationid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`educationdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`educationdetails` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`educationdetails` (
  `userid` INT(11) NOT NULL,
  `educationid` INT(11) NOT NULL,
  `detailslink` VARCHAR(50) NULL DEFAULT NULL,
  `fileorurl` ENUM('file','url') NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `educationdetails_ibfk_1`
    FOREIGN KEY (`userid` , `educationid`)
    REFERENCES `CMPE_282`.`education` (`userid` , `educationid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_educationid` ON `CMPE_282`.`educationdetails` (`userid` ASC, `educationid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`skills`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`skills` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`skills` (
  `userid` INT(11) NOT NULL,
  `skillid` INT(11) NOT NULL AUTO_INCREMENT,
  `skillname` VARCHAR(50) NULL DEFAULT NULL,
  `endorsementcount` INT(11) NULL DEFAULT '0',
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`skillid`),
  CONSTRAINT `skills_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`skills` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`endorsements`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`endorsements` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`endorsements` (
  `userid` INT(11) NOT NULL,
  `skillid` INT(11) NOT NULL,
  `euserid` INT(11) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `endorsements_ibfk_1`
    FOREIGN KEY (`euserid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`),
  CONSTRAINT `endorsements_ibfk_2`
    FOREIGN KEY (`userid` , `skillid`)
    REFERENCES `CMPE_282`.`skills` (`userid` , `skillid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`endorsements` (`euserid` ASC);

CREATE INDEX `fk_skill` ON `CMPE_282`.`endorsements` (`userid` ASC, `skillid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`experience`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`experience` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`experience` (
  `userid` INT(11) NOT NULL,
  `experienceid` INT(11) NOT NULL AUTO_INCREMENT,
  `companyname` VARCHAR(100) NULL DEFAULT NULL,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `location` VARCHAR(50) NULL DEFAULT NULL,
  `startdate` DATE NULL DEFAULT NULL,
  `enddate` DATE NULL DEFAULT NULL,
  `currentlyworking` TINYINT(1) NULL DEFAULT '0',
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`experienceid`),
  CONSTRAINT `experience_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `experience_ibfk_1` ON `CMPE_282`.`experience` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`experiencedetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`experiencedetails` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`experiencedetails` (
  `userid` INT(11) NOT NULL,
  `experienceid` INT(11) NOT NULL,
  `detailslink` VARCHAR(50) NULL DEFAULT NULL,
  `fileorurl` ENUM('file','url') NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  CONSTRAINT `experiencedetails_ibfk_1`
    FOREIGN KEY (`userid` , `experienceid`)
    REFERENCES `CMPE_282`.`experience` (`userid` , `experienceid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_experience` ON `CMPE_282`.`experiencedetails` (`userid` ASC, `experienceid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`following`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`following` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`following` (
  `userid` INT(11) NOT NULL,
  `category` ENUM('company','school') NULL DEFAULT NULL,
  `organisationid` INT(11) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `following_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`),
  CONSTRAINT `following_ibfk_2`
    FOREIGN KEY (`organisationid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`following` (`userid` ASC);

CREATE INDEX `fk_organisationid` ON `CMPE_282`.`following` (`organisationid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`honorsandawards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`honorsandawards` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`honorsandawards` (
  `userid` INT(11) NOT NULL,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `occupation` VARCHAR(50) NULL DEFAULT NULL,
  `issuer` VARCHAR(50) NULL DEFAULT NULL,
  `dateofissue` DATE NULL DEFAULT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `honorsandawards_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`honorsandawards` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`languages` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`languages` (
  `userid` INT(11) NOT NULL,
  `languages` VARCHAR(25) NULL DEFAULT NULL,
  `proficiency` VARCHAR(25) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `languages_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`languages` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`likes` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`likes` (
  `postid` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `likes_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`),
  CONSTRAINT `likes_ibfk_2`
    FOREIGN KEY (`postid`)
    REFERENCES `CMPE_282`.`posts` (`postid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`likes` (`userid` ASC);

CREATE INDEX `fk_postid` ON `CMPE_282`.`likes` (`postid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`organisation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`organisation` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`organisation` (
  `userid` INT(11) NULL DEFAULT NULL,
  `organisationname` VARCHAR(50) NULL DEFAULT NULL,
  `organisationtype` ENUM('company','school') NULL DEFAULT NULL,
  `photo` VARCHAR(50) NULL DEFAULT NULL,
  `following` INT(11) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `organisation_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`organisation` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`projects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`projects` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`projects` (
  `userid` INT(11) NOT NULL,
  `projectid` INT(11) NOT NULL DEFAULT '0',
  `pname` VARCHAR(50) NULL DEFAULT NULL,
  `poccupation` VARCHAR(50) NULL DEFAULT NULL,
  `startdate` DATE NULL DEFAULT NULL,
  `enddate` DATE NULL DEFAULT NULL,
  `currentlyworking` TINYINT(1) NULL DEFAULT '0',
  `projecturl` VARCHAR(50) NULL DEFAULT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`userid`, `projectid`),
  CONSTRAINT `projects_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `CMPE_282`.`projectmembers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`projectmembers` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`projectmembers` (
  `userid` INT(11) NOT NULL,
  `projectid` INT(11) NOT NULL,
  `muserid` INT(11) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `projectmembers_ibfk_1`
    FOREIGN KEY (`muserid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`),
  CONSTRAINT `projectmembers_ibfk_2`
    FOREIGN KEY (`userid` , `projectid`)
    REFERENCES `CMPE_282`.`projects` (`userid` , `projectid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`projectmembers` (`muserid` ASC);

CREATE INDEX `fk_projectid` ON `CMPE_282`.`projectmembers` (`userid` ASC, `projectid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`summary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`summary` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`summary` (
  `userid` INT(11) NOT NULL,
  `summarydesc` VARCHAR(1000) NULL DEFAULT NULL,
  `document` VARCHAR(50) NULL DEFAULT NULL,
  `photo` VARCHAR(50) NULL DEFAULT NULL,
  `link` VARCHAR(50) NULL DEFAULT NULL,
  `video` VARCHAR(50) NULL DEFAULT NULL,
  `presentation` VARCHAR(50) NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  `modifydate` DATE NULL DEFAULT NULL,
  CONSTRAINT `summary_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_userid` ON `CMPE_282`.`summary` (`userid` ASC);


-- -----------------------------------------------------
-- Table `CMPE_282`.`userdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CMPE_282`.`userdetails` ;

CREATE TABLE IF NOT EXISTS `CMPE_282`.`userdetails` (
  `userid` INT(11) NOT NULL,
  `firstname` VARCHAR(25) NULL DEFAULT NULL,
  `lastname` VARCHAR(25) NULL DEFAULT NULL,
  `email` VARCHAR(40) NULL DEFAULT NULL,
  `photo` VARCHAR(50) NULL DEFAULT NULL,
  `headline` VARCHAR(100) NULL DEFAULT NULL,
  `country` VARCHAR(50) NULL DEFAULT NULL,
  `state` VARCHAR(50) NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `industry` VARCHAR(50) NULL DEFAULT NULL,
  `phone` VARCHAR(50) NULL DEFAULT NULL,
  `address` VARCHAR(50) NULL DEFAULT NULL,
  `twitter_handle` VARCHAR(50) NULL DEFAULT NULL,
  `websites` VARCHAR(50) NULL DEFAULT NULL,
  `summary` TINYINT(1) NULL DEFAULT '0',
  `certifications` TINYINT(1) NULL DEFAULT '0',
  `honorsandawards` TINYINT(1) NULL DEFAULT '0',
  `experience` TINYINT(1) NULL DEFAULT '0',
  `skillsandendorsements` TINYINT(1) NULL DEFAULT '0',
  `projects` TINYINT(1) NULL DEFAULT '0',
  `languages` TINYINT(1) NULL DEFAULT '0',
  `education` TINYINT(1) NULL DEFAULT '0',
  `additionalinfo` TINYINT(1) NULL DEFAULT '0',
  `volunteer` TINYINT(1) NULL DEFAULT '0',
  `courses` TINYINT(1) NULL DEFAULT '0',
  `following` TINYINT(1) NULL DEFAULT '0',
  `modifydate` DATE NULL DEFAULT NULL,
  `creationdate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`userid`),
  CONSTRAINT `userdetails_ibfk_1`
    FOREIGN KEY (`userid`)
    REFERENCES `CMPE_282`.`userauthenticate` (`userid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

USE `CMPE_282`;

DELIMITER $$

USE `CMPE_282`$$
DROP TRIGGER IF EXISTS `CMPE_282`.`comment_count` $$
USE `CMPE_282`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `CMPE_282`.`comment_count`
AFTER INSERT ON `CMPE_282`.`comments`
FOR EACH ROW
update posts set comments=comments+1 where postid=new.postid$$


USE `CMPE_282`$$
DROP TRIGGER IF EXISTS `CMPE_282`.`like_count` $$
USE `CMPE_282`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `CMPE_282`.`like_count`
AFTER INSERT ON `CMPE_282`.`likes`
FOR EACH ROW
update posts set likes=likes+1 where postid=new.postid$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

ALTER TABLE userdetails add column dob varchar(25);
ALTER TABLE userdetails modify column summary varchar(250);
alter table userauthenticate add column usertype varchar(3) default 'usr';
alter table organisation add column email varchar(40);

CREATE TABLE `jobapplications` (
  `applicationid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(45) NOT NULL,
  `jobid` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`applicationid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1