-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: test_schema_17_oct
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `words_stats`
--

DROP TABLE IF EXISTS `words_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `words_stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `word` varchar(100) DEFAULT NULL,
  `instances_cnt` int DEFAULT NULL,
  `translation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65521274 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `words_stats`
--

LOCK TABLES `words_stats` WRITE;
/*!40000 ALTER TABLE `words_stats` DISABLE KEYS */;
INSERT INTO `words_stats` VALUES (65521121,'di',65521116,NULL),(65521122,'e',42488476,NULL),(65521123,'che',27182874,NULL),(65521124,'la',29700049,NULL),(65521125,'il',29996358,NULL),(65521126,'in',23652190,NULL),(65521127,'a',21542129,NULL),(65521128,'del',19726025,NULL),(65521129,'per',20696169,NULL),(65521130,'un',15479509,NULL),(65521131,'della',15136242,NULL),(65521132,'è',14929934,NULL),(65521133,'l\'',13568647,NULL),(65521134,'non',13894771,NULL),(65521135,'le',13217097,NULL),(65521136,'i',13320663,NULL),(65521137,'con',10987094,NULL),(65521138,'una',10763823,NULL),(65521139,'si',11111909,NULL),(65521140,'da',9235795,NULL),(65521141,'dei',8933921,NULL),(65521142,'al',8485938,NULL),(65521143,'dell\'',8195374,NULL),(65521144,'delle',7456369,NULL),(65521145,'alla',6161794,NULL),(65521146,'sono',6130497,NULL),(65521147,'ha',5671035,NULL),(65521148,'nel',5498471,NULL),(65521149,'o',5350146,NULL),(65521150,'più',5212094,NULL),(65521151,'come',5027056,NULL),(65521152,'anche',4855763,NULL),(65521153,'gli',4542539,NULL),(65521154,'all\'',4422563,NULL),(65521155,'ma',4293333,NULL),(65521156,'ed',3821332,NULL),(65521157,'cui',3798979,NULL),(65521158,'dal',3769430,NULL),(65521159,'ad',3701507,NULL),(65521160,'nella',3285882,NULL),(65521161,'se',4029283,NULL),(65521162,'essere',3245837,NULL),(65521163,'degli',3189686,NULL),(65521164,'ai',3174868,NULL),(65521165,'lo',3151369,NULL),(65521166,'questo',2980292,NULL),(65521167,'alle',2973401,NULL),(65521168,'dalla',2692288,NULL),(65521169,'su',2414120,NULL),(65521170,'tra',2364375,NULL),(65521171,'ci',2127583,NULL),(65521172,'solo',2118720,NULL),(65521173,'sia',2114217,NULL),(65521174,'loro',2096646,NULL),(65521175,'parte',2069079,NULL),(65521176,'hanno',2043178,NULL),(65521177,'sul',2017732,NULL),(65521178,'tutti',2004089,NULL),(65521179,'anni',1995093,NULL),(65521180,'mi',1965379,NULL),(65521181,'legge',1853675,NULL),(65521182,'due',1847881,NULL),(65521183,'stato',1838296,NULL),(65521184,'dall\'',1795126,NULL),(65521185,'sulla',1747586,NULL),(65521186,'sua',1743421,NULL),(65521187,'era',1726833,NULL),(65521188,'un\'',1716892,NULL),(65521189,'nell\'',1697563,NULL),(65521190,'nei',1687819,NULL),(65521191,'questa',1667628,NULL),(65521192,'può',1639275,NULL),(65521193,'prima',1625630,NULL),(65521194,'suo',1614474,NULL),(65521195,'lavoro',1582948,NULL),(65521196,'uno',1513843,NULL),(65521197,'quanto',1501298,NULL),(65521198,'sempre',1481805,NULL),(65521199,'tutto',1433133,NULL),(65521200,'ogni',1418035,NULL),(65521201,'fatto',1416572,NULL),(65521202,'quello',1410335,NULL),(65521203,'articolo',1370401,NULL),(65521204,'ho',1337571,NULL),(65521205,'nelle',1326016,NULL),(65521206,'altri',1325368,NULL),(65521207,'poi',1313573,NULL),(65521208,'senza',1313148,NULL),(65521209,'comma',1294792,NULL),(65521210,'tempo',1288414,NULL),(65521211,'perché',1272671,NULL),(65521212,'ancora',1258359,NULL),(65521213,'quando',1247131,NULL),(65521214,'molto',1246298,NULL),(65521215,'quale',1244672,NULL),(65521216,'così',1244269,NULL),(65521217,'attività',1238664,NULL),(65521218,'quella',1238390,NULL),(65521219,'dopo',1232332,NULL),(65521220,'anno',1224526,NULL),(65521221,'altro',1209600,NULL),(65521222,'caso',1197140,NULL),(65521223,'già',1194062,NULL),(65521224,'Ma',1172022,NULL),(65521225,'fare',1164126,NULL),(65521226,'proprio',1124530,NULL),(65521227,'ne',1119569,NULL),(65521228,'modo',1111342,NULL),(65521229,'Italia',1111094,NULL),(65521230,'dello',1110531,NULL),(65521231,'secondo',1109443,NULL),(65521232,'vita',1099669,NULL),(65521233,'art.',1087565,NULL),(65521234,'fa',1071079,NULL),(65521235,'dai',1062278,NULL),(65521236,'dalle',1053433,NULL),(65521237,'chi',1031921,NULL),(65521238,'agli',1023179,NULL),(65521239,'mondo',1000937,NULL),(65521240,'stesso',992009,NULL),(65521241,'deve',958256,NULL),(65521242,'dove',948359,NULL),(65521243,'cosa',943969,NULL),(65521244,'quindi',937880,NULL),(65521245,'quali',937200,NULL),(65521246,'primo',919814,NULL),(65521247,'fine',900816,NULL),(65521248,'io',897180,NULL),(65521249,'stata',884997,NULL),(65521250,'via',881398,NULL),(65521251,'presente',844957,NULL),(65521252,'questi',841291,NULL),(65521253,'tutte',835430,NULL),(65521254,'grande',826958,NULL),(65521255,'Un',822980,NULL),(65521256,'possono',818853,NULL),(65521257,'viene',817242,NULL),(65521258,'volta',812460,NULL),(65521259,'punto',810713,NULL),(65521260,'mai',801026,NULL),(65521261,'sarà',795875,NULL),(65521262,'ore',794155,NULL),(65521263,'oggi',791794,NULL),(65521264,'base',782997,NULL),(65521265,'giorni',782741,NULL),(65521266,'sistema',774889,NULL),(65521267,'fino',773460,NULL),(65521268,'rispetto',772914,NULL),(65521269,'ora',767444,NULL),(65521270,'particolare',765827,NULL),(65521271,'tre',760316,NULL),(65521272,'altre',742518,NULL),(65521273,'tale',742329,NULL);
/*!40000 ALTER TABLE `words_stats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-16  7:49:42
