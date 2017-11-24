-- MySQL dump 10.13  Distrib 5.5.27, for Win32 (x86)
--
-- Host: localhost    Database: locator_app
-- ------------------------------------------------------
-- Server version	5.5.27-log

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `rating` int(2) NOT NULL,
  `content` text NOT NULL,
  `created_time` text NOT NULL,
  `location_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_location_id` (`location_id`),
  CONSTRAINT `fk_location_id` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (3,5,'Tuyệt vời ông mặt trời','1511332949970',23,11);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keywords` (
  `location_id` int(8) NOT NULL,
  `keyword` varchar(32) NOT NULL,
  PRIMARY KEY (`location_id`,`keyword`),
  CONSTRAINT `fk_keyword_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` VALUES (10,'Drinks'),(10,'Food'),(10,'Power'),(10,'Wifi'),(11,'Drinks'),(11,'Food'),(11,'Power'),(11,'Silence'),(11,'Wifi'),(14,'Drinks'),(14,'Power'),(14,'Silence'),(14,'Wifi'),(16,'Drinks'),(16,'Outdoor'),(16,'Power'),(16,'Wifi'),(17,'Drinks'),(17,'Outdoor'),(17,'Overnight'),(17,'Power'),(17,'Wifi'),(20,'Drinks'),(20,'Outdoor'),(20,'Overnight'),(20,'Power'),(20,'Wifi'),(21,'Food'),(21,'Game'),(21,'Outdoor'),(23,'Drinks'),(23,'Food'),(23,'Power'),(23,'Silence'),(23,'Wifi'),(24,'Drinks'),(24,'Food'),(24,'Overnight'),(24,'Wifi'),(27,'Drinks'),(27,'Food'),(27,'Silence'),(27,'Wifi'),(28,'Drinks'),(28,'Power'),(28,'Silence'),(28,'Wifi'),(31,'Drinks'),(31,'Food'),(31,'Outdoor'),(31,'Wifi'),(32,'Drinks'),(32,'Food'),(32,'Wifi'),(33,'Game'),(33,'Outdoor'),(33,'Silence'),(34,'Drinks'),(34,'Food'),(34,'Power'),(34,'Wifi'),(35,'Drinks'),(35,'Food'),(35,'Outdoor'),(35,'Overnight'),(36,'Outdoor'),(36,'Power'),(36,'Silence'),(36,'Wifi');
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `address` text NOT NULL,
  `rating` int(2) NOT NULL DEFAULT '3',
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  `discount` text,
  `avatar` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (10,'Starbucks IPH','dating','Dịch Vọng Hậu, Hà Nội',5,105.782421,21.036357,'0','https://lh5.googleusercontent.com/p/AF1QipMSEIlU330Qcil_-TdiP3JKJofaVG19U9ddpSTj=w408-h271-k-no'),(11,'HighLand Coffee','study','Dịch Vọng Hậu, Hà Nội',4,105.782421,21.036357,'0','https://lh5.googleusercontent.com/p/AF1QipPi8MAKavUd6roc4HdsOaipm7RcG3aX8L5T4kKv=w408-h247-k-no'),(14,'BubbleTea','dating','Xuân Thủy, Dịch Vọng Hậu, Hà Nội',5,105.782938,21.036815,'0','https://lh5.googleusercontent.com/p/AF1QipM7hW2n99xlcyWzdNh-FuLCW_yH_2TuaY1O5vCg=w408-h306-k-no'),(16,'Feeling Tea IPH','study','Xuân Thủy, Dịch Vọng Hậu, Hà Nội',5,105.782911,21.035986,'0','https://lh5.googleusercontent.com/p/AF1QipOZ4qwtQJqoTdf8RlJwJL4elikqSCkJn2kF-xXa=w408-h408-k-no'),(17,'Cafe Sách','study','136 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',4,105.784575,21.036849,'0','https://lh5.googleusercontent.com/p/AF1QipNlQaxT9n0B8Nvm1b69G7XoN0jlADUQEAVn6ZZS=w408-h266-k-no'),(20,'Circle K Xuân Thủy','study','177 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',4,105.784994,21.036349,'0','https://media.foody.vn/res/g28/271874/s/foody-circle-k-xuan-thuy-637-636110486613262480.jpg'),(21,'Bảo tàng Dân tộc học Việt Nam','study','Nguyễn Văn Huyên, Nghĩa Đô, Cầu Giấy, Hà Nội',4,105.798522,21.040582,'0','https://lh3.googleusercontent.com/proxy/h55iMchDQ3Fgzc2Zy_5XbCHUSjrX-uh8fKL2F_GEZp8r5HpPuhwYsPk9lkKfPBmt3VIhjXg3d3v8MCDwpGjyW816vt056s1OVvyop9sYnMYNz-cYMZaowD2DI0j_M6qE2hHgYvXzkWlEcfAuquCmv_xSg8lTPpw=w285-h160-k-no'),(23,'KFC Nguyễn Khánh Toàn','dating','Lô số 2 Nguyễn Khánh Toàn, Quan Hoa, Cầu Giấy, Hà Nội',5,105.801401,21.037879,'0','https://lh5.googleusercontent.com/p/AF1QipOSIw_0Bxc3ABMybdX1x8rxAEwKFaOFudkdos2W=w408-h272-k-no'),(24,'Cafe Mộc Quán','work','215 Tô Hiệu, Nghĩa Tân, Cầu Giấy, Hà Nội',3,105.793379,21.041233,'0','data:image/jpeg;base64,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'),(27,'Wanted Quán','dating','Khu tập thể Đại học Ngoại ngữ, Dịch Vọng Hậu, Cầu Giấy',3,105.782759,21.041083,'0','https://lh5.googleusercontent.com/p/AF1QipOw04erBM_IlBkExEKwbtwSBUnaBoLvtAT7UHMd=w408-h544-k-no'),(28,'Cafe Cộng','dating','Khu tập thể Đại học Ngoại ngữ, Dịch Vọng Hậu, Cầu Giấy',3,105.797829,21.038182,'0','https://lh5.googleusercontent.com/p/AF1QipMt6T9qVRv-hBxsid-Jsu6sAUdBL65RsGnCUrkx=w408-h229-k-no'),(31,'Exyt Coffee','study','Dịch Vọng Hậu, Cầu Giấy, Hà Nội',5,105.782471,21.038429,'0','https://maps.gstatic.com/tactile/pane/default_geocode-1x.png'),(32,'Chago Tea & Cafe','dating','8 Nguyễn Khánh Toàn, Quan Hoa, Cầu Giấy, Hà Nội',5,105.798986,21.038909,'0','https://lh5.googleusercontent.com/p/AF1QipOuvnxMY4K79TM3CJZ4Odog01htpKap4S8ye6eY=w408-h544-k-no'),(33,'Công Viên Thủ Lệ','dating','547 Kim Mã, Cầu Giấy, Hà Nội',3,105.804223,21.029867,'12%','http://a9.vietbao.vn/images/vn999/350/2011/06/20110621-ho-thu-le-yen-a-mot-chieu-nang...-0.jpg'),(34,'Green Coffee','work','92 Láng Hạ, Đống Đa, Hà Nội',4,105.811273,21.011551,'12%','https://lh5.googleusercontent.com/p/AF1QipM7It2rLzBpwZZpYknjvrfwl4vNgNG2It9_gAwi=w408-h271-k-no'),(35,'Nhà Hàng Hương Việt','dating','12 Yên Lãng, Đống Đa, Hà Nội',2,105.81424,21.009506,'12%','https://lh5.googleusercontent.com/p/AF1QipPNBHRseChbQscIrNngHP_VSBX0ynOvgdTd8pCd=w408-h306-k-no'),(36,'Cư Xá Cà Phê','work','A11 Khương Thượng, Tôn Thất Tùng, Trung Tự, Hà Nội',3,105.830791,21.005054,'12%','https://lh5.googleusercontent.com/p/AF1QipOuctmyTPs-5wP5iOkGlTPTUK3B6OUzxOuzup3X=w408-h306-k-no');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opening_times`
--

DROP TABLE IF EXISTS `opening_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opening_times` (
  `day` text NOT NULL,
  `state` tinyint(1) NOT NULL,
  `open` text NOT NULL,
  `close` text NOT NULL,
  `location_id` int(8) NOT NULL,
  KEY `fk_opening_time` (`location_id`),
  CONSTRAINT `fk_opening_time` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opening_times`
--

LOCK TABLES `opening_times` WRITE;
/*!40000 ALTER TABLE `opening_times` DISABLE KEYS */;
INSERT INTO `opening_times` VALUES ('Weekdays',1,'9h00','23h00',10),('Weekend',1,'10h00','24h00',10),('Weekdays',1,'9h00','23h00',11),('Weekend',1,'10h00','24h00',11),('Weekdays',1,'9h00','23h00',14),('Weekend',1,'10h00','24h00',14),('Weekdays',1,'9h00','23h00',16),('Weekend',1,'10h00','24h00',16),('Weekdays',1,'9h00','23h00',17),('Weekend',1,'10h00','24h00',17),('Weekdays',1,'Open all day','',20),('Weekend',1,'Open all day','',20),('Weekdays',1,'8h00','17h00',21),('Weekend',1,'8h00','17h00',21),('Weekdays',1,'8h00','22h00',23),('Weekend',1,'8h00','22h00',23),('Weekdays',1,'8h00','22h00',24),('Weekend',1,'8h00','22h00',24),('Weekdays',1,'8h00','22h00',27),('Weekend',1,'8h00','22h00',27),('Weekdays',1,'8h00','22h00',28),('Weekend',1,'8h00','22h00',28),('Weekdays',1,'8h00','21h00',31),('Weekend',1,'8h00','21h00',31),('Weekdays',1,'8h00','24h00',32),('Weekend',1,'8h00','23h00',32),('Monday - Friday',1,'7:00AM','9:00PM',33),('Saturday - Sunday',0,'','',33),('Weekdays',1,'8h00','22h15',34),('Weekend',0,'','',34),('Weekdays',1,'6h00','20h15',35),('Weekend',0,'','',35),('All days',1,'9h15','23h30',36);
/*!40000 ALTER TABLE `opening_times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `salt` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'buimanhthangnt@gmail.com','Bui Manh Thang','49a34499848e530256cf7fdb7fce8fc56d604763ff08ab294f3d5574988ef60a96aeb139458a0351774611fca7994463d9026847343eea7aeea4f0c5a6c5ee9d','e46f8f671fa1372670652ffdf737e70b'),(12,'nguyendangthe2204@gmail.com','Nguyen Dang The','44d93b5a233a85636b635791477921a0e3579a60ea66711f686cd02c18fb52637c5a590816a06897f6daa4dc4826f34eca25602fed3336263c019f057b4041b4','ceb4103bb1cc0902d16764d05e357379'),(13,'thuylinh@gmail.com','Bui Thuy Linh','5f80629bbcf466eaf26f243b3557dc8ada4dd940375235125adcf3ae8733b46b8024a7189974858e35ebe4b6d63009c14daa17260e4cd16eb6759aa422616a0e','e775c617c09d263961a0cf39ae9b1adc');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-24 11:10:05
