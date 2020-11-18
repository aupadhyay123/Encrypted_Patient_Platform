-- MySQL dump 10.13  Distrib 8.0.19, for osx10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: vaunect
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `conversation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` varchar(41) NOT NULL,
  `user2` varchar(41) NOT NULL,
  `secret_key` varchar(200) DEFAULT NULL,
  `nonce` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`conversation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'xxxx','yyyy','dnfoenf','oqfnewoqfn'),(2,'arif1','arif2','181,134,184,116,47,239,150,17,77,51,5,103,148,45,157,152,243,239,72,79,49,164,245,8,243,78,77,179,73,24,154,211','74,110,255,64,26,1,159,13,56,93,73,142,45,201,140,178,25,65,255,117,73,110,31,115');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_requests`
--

DROP TABLE IF EXISTS `friend_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_requests` (
  `friend_request_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_sender` varchar(41) NOT NULL,
  `user_receiver` varchar(41) NOT NULL,
  PRIMARY KEY (`friend_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_requests`
--

LOCK TABLES `friend_requests` WRITE;
/*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `friend_id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` varchar(41) NOT NULL,
  `user2` varchar(41) NOT NULL,
  PRIMARY KEY (`friend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(11) NOT NULL,
  `user_id` varchar(41) NOT NULL,
  `message` varchar(400) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(41) NOT NULL,
  `username` varchar(45) NOT NULL,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(150) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('9FVZc4yC7eGsaVSBYKeLNAgKLo8GnEfL7BDE4st8','johngaldones','John','Galdones','john@gmail.com','123-456-7890','12345678'),('FFAFzUsCmV3qmLVS2TGaDJ8ekibNLYd9fQSfXhft','arif123','gAAAAABfkhy3jDll4UUsGSWwoJz9HZaq34Ggw9ZWtX5ps0LySElGZyuMG1-QQ4IBiS4XsP8C65ukDcDgihXlz6mky1KL5rgTXg==','gAAAAABfkhy3U5vWmwCBjwkljMqnHyQrE8QLwjuaX8SpBLPwbcTMOm6kxjSn2eqKlrOTDrfl3BkIjSy3AVIlbGWSmGr866rOFA==','gAAAAABfkhy33m61X8PCMX6XMrMkgQOkioO4_5YwizIzeWzBdA5sBanoo9SWiP1XpW6WCgfIDuJ0XWUVBkb3R7AUPgm1857XsPqS38s2ldaAhS4ZS9X3J9M=','gAAAAABfkhy3yz1HITILKLZWumpJ6O-oRBygIoBhpl1c4_wZgioNu6f_SiEuw3V7al71lYvFOICXOoV2U8dFHIZhr0Oo2MJcAg==','gAAAAABfkhy30E2ALm-FM-G8pVm_9I4RAuPelaDCNJrR9lpGpKYAFOUt1YLtl3FbEwVaD5aXLRH-2KqW9tTjeCFDtIfh8JChkQ=='),('J4xb6yPWNv5V8PGFqDV83buHKNmp9b547orVB5eA','johndf','john','galdones','as@gmail.com','1234567890','12345678'),('YrsbwCFnPnVkaTC44uCc28BNyMAGkjQR22KjRLQa','arif','gAAAAABfkedfoLtkWXeoTLhsSY7GwP-JywaWpRqUI8jV_fvdSXH8_zup6Ja2Z9QoNoK1-w9C0mVS1qHqcxjBqdIzYuEWSIVjyQ==','gAAAAABfkedfYC8FTRTZ3gPQEzlwRNsfhbEACA2ip95QS19XCywMHgkVFfJRYMUpHC4CrVi4EIrrcK46mqh5MMiuNUi-5Ef_1A==','gAAAAABfkedfgyFfJPjJmV5UY3_Ww0sOqUqbxRSQns3a_YiLOas-6zWWR9P1bIn2TlCX9y8xn0snliPbUzvcOwhjHAhW1Kz7Yw==','gAAAAABfkedfsHdF6tEOMdJSnqBot-xh2wlpAwQ6PBt1nSILc0mwNPO_MGTwjOSmEQOYAW1QQMMOUdZU_S80qdFShP5DM752Hw==','gAAAAABfkedfCf-9Z-XxgQ_pDjQEdQ09ypa0jDqh08iw_TO3NJjCjnLz-vHj58EP9jFIA989gewbMy89IJn3CTI0S-P1qU-Gpg==');
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

-- Dump completed on 2020-10-23 13:35:29
