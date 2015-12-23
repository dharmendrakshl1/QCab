CREATE DATABASE  IF NOT EXISTS `qcab` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `qcab`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: qcab
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `EmployeeId` int(11) NOT NULL,
  PRIMARY KEY (`EmployeeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (2344),(5656),(5755);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabdetails`
--

DROP TABLE IF EXISTS `cabdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabdetails` (
  `CabId` int(10) NOT NULL,
  `CabNumber` varchar(15) NOT NULL,
  `DriverName` varchar(50) NOT NULL,
  `Availability` varchar(50) NOT NULL,
  `VendorType` varchar(50) NOT NULL,
  `DriverContactNumber` varchar(15) NOT NULL,
  PRIMARY KEY (`CabId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabdetails`
--

LOCK TABLES `cabdetails` WRITE;
/*!40000 ALTER TABLE `cabdetails` DISABLE KEYS */;
INSERT INTO `cabdetails` VALUES (1,'KA01 A 2343','Mohan','yes','permanent','9856325412'),(2,'KA 03 S 7545','ram','no','permanent','8865235210');
/*!40000 ALTER TABLE `cabdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabrequest`
--

DROP TABLE IF EXISTS `cabrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabrequest` (
  `RequestId` int(11) NOT NULL,
  `EmployeeId` int(11) NOT NULL,
  `PickUpDate` date NOT NULL,
  `PickUpTime` time NOT NULL,
  `PickUpPoint` varchar(500) NOT NULL,
  `DropPoint` varchar(500) NOT NULL,
  `AvailStatus` varchar(500) NOT NULL,
  `TripId` int(11) NOT NULL,
  PRIMARY KEY (`RequestId`),
  KEY `fck2_idx` (`EmployeeId`),
  KEY `fck3_idx` (`TripId`),
  CONSTRAINT `fck3` FOREIGN KEY (`TripId`) REFERENCES `cabtrip` (`TripId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fck2` FOREIGN KEY (`EmployeeId`) REFERENCES `employee` (`EmployeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabrequest`
--

LOCK TABLES `cabrequest` WRITE;
/*!40000 ALTER TABLE `cabrequest` DISABLE KEYS */;
INSERT INTO `cabrequest` VALUES (1,5656,'2015-08-15','10:40:08','office','Residential','turn up',1),(2,5656,'2015-08-15','00:00:00','Residential','office','no show',2),(3,5755,'2015-06-10','00:00:00','Residential','Office','turn up',3);
/*!40000 ALTER TABLE `cabrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabtrip`
--

DROP TABLE IF EXISTS `cabtrip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabtrip` (
  `TripId` int(10) NOT NULL,
  `CabId` int(10) NOT NULL,
  `NOE` int(10) NOT NULL,
  `Escorts` varchar(20) NOT NULL,
  PRIMARY KEY (`TripId`),
  KEY `fck3_idx` (`CabId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabtrip`
--

LOCK TABLES `cabtrip` WRITE;
/*!40000 ALTER TABLE `cabtrip` DISABLE KEYS */;
INSERT INTO `cabtrip` VALUES (1,1,1,'surendra'),(2,2,2,'mohan'),(3,2,4,'rajendra');
/*!40000 ALTER TABLE `cabtrip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailactivitydetail`
--

DROP TABLE IF EXISTS `emailactivitydetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailactivitydetail` (
  `ActivityId` int(11) NOT NULL,
  `ActivitySubject` varchar(600) NOT NULL,
  `employee` tinyint(1) DEFAULT '0',
  `manager` tinyint(1) DEFAULT '0',
  `admin` tinyint(1) DEFAULT '0',
  `csr` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ActivityId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailactivitydetail`
--

LOCK TABLES `emailactivitydetail` WRITE;
/*!40000 ALTER TABLE `emailactivitydetail` DISABLE KEYS */;
INSERT INTO `emailactivitydetail` VALUES (100,'Request raised by employee',1,1,1,0),(101,'Request approve by manager',1,1,0,0),(102,'Request approve by admin',1,1,1,0),(104,'Request rejected by manager',1,1,0,0),(105,'Request rejected by admin',1,1,1,0);
/*!40000 ALTER TABLE `emailactivitydetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `EmployeeId` int(11) NOT NULL,
  `EmployeeName` varchar(50) NOT NULL,
  `Gender` varchar(11) NOT NULL,
  `ProjectId` int(11) DEFAULT NULL,
  `ManagerId` int(11) DEFAULT NULL,
  `ResidentialAddress` varchar(500) NOT NULL,
  `OfficeAddress` varchar(500) NOT NULL,
  `ContactNumber` varchar(15) NOT NULL,
  PRIMARY KEY (`EmployeeId`),
  KEY `fck1` (`ManagerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (20,'Vasudevan','Male',1,NULL,'Bangalore','Quinnox, Bangalore','9856985632'),(21,'Arun C.R','Male',1,NULL,'Bangalore','Quinnox, Bangalore','9798240143'),(2344,'Nishant','MALE',102,21,'354,BTM Layout,Bangalore','Quinnox,Bangalore','9856325412'),(5656,'Aarthi PAlanisamy','Female',102,20,'11/3,Krishna Residency,Basavanagudi','Quinnox Amr Tech Park','8856985632'),(5755,'Pankaja','Female',1,21,'123,Chamarajpet,Bangalore','Quinnox,Bangalore','8695632541');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manager` (
  `ManagerId` int(5) NOT NULL,
  `ManagerName` varchar(50) NOT NULL,
  `ContactNumber` varchar(15) NOT NULL,
  `ProjectId` int(5) NOT NULL,
  PRIMARY KEY (`ManagerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (1,'Vasudevan','9856985632',1),(2,'Arun C.R','9798240115',2);
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `ProjectId` int(5) NOT NULL AUTO_INCREMENT,
  `ProjectName` varchar(50) NOT NULL,
  PRIMARY KEY (`ProjectId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'aaa'),(102,'WmEbiz'),(103,'Pricing');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`RoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Manager'),(3,'Employee'),(4,'CSR');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `EmployeeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `RoleId` (`RoleId`),
  KEY `EmployeeId` (`EmployeeId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `role` (`RoleId`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`EmployeeId`) REFERENCES `employee` (`EmployeeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (20,'vasu','vasu@123',2,20),(21,'arunc','arun@123',2,21),(2344,'nishant','nishant@123',3,2344),(5656,'aarthip','aarthi@123',3,5656),(5755,'pankaja','pankaja@123',3,5755);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-23 16:29:42
