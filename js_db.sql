/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.28-MariaDB : Database - js_db
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`integradora` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;

USE `integradora`;

/*Table structure for table `tb_alumnos` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE usuarios (
    `id_usuarios` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(50) NOT NULL,
    `app` VARCHAR(50) NOT NULL,
    `apm` VARCHAR(50),
    `fn` DATE NOT NULL,
    `sexo` VARCHAR(20) NOT NULL,
    `correo` VARCHAR(100) UNIQUE NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL
);

/*Table structure for table `tb_carrera` */

DROP TABLE IF EXISTS `tb_carreras`;

CREATE TABLE `tb_carreras` (
  `id_carrera` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_carrera`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `tb_carrera` */

insert  into `tb_carreras`(`id_carrera`,`nombre`) values (1,'TIC'),(2,'Mecatronica'),(3,'QTA'),(4,'Negocios');

/*Table structure for table `tb_grupos` */

DROP TABLE IF EXISTS `tb_grupos`;

CREATE TABLE `tb_grupos` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `tb_grupos` */

insert  into `tb_grupos`(`id_grupo`,`nombre`,`id_carrera`) values (1,'DSM',1),(2,'IDGS',1),(3,'IRD',1),(4,'IRIC',1),(5,'MEC',2),(6,'NEG',4),(7,'QTA',3),(8,'IQTA',3),(9,'INEG',4),(10,'IMEC',2);

/*Table structure for table `tb_registros` */

DROP TABLE IF EXISTS `tb_registros`;

CREATE TABLE `tb_registros` (
  `id_registro` bigint(20) NOT NULL AUTO_INCREMENT,
  `valor` double NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_registro`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `tb_registros` */

insert  into `tb_registros`(`id_registro`,`valor`,`timestamp`) values (1,12.4,'2024-04-01 17:00:27'),(2,12.6,'2024-04-02 17:00:27'),(3,16,'2024-04-03 17:00:27'),(4,12.3,'2024-04-01 17:00:27'),(5,12.4,'2024-04-01 17:00:27'),(6,12.4,'2024-04-01 17:00:27'),(7,0.2,'2024-04-01 17:00:27'),(8,12.4,'2024-04-01 17:00:27'),(9,12.3,'2024-04-01 17:01:51'),(10,12.4,'2024-04-01 17:00:27'),(11,9.4,'2024-04-01 17:01:39'),(12,12.4,'2024-04-01 17:00:27'),(13,12.3,'2024-04-01 17:01:53'),(14,12.3,'2024-04-01 17:01:54'),(15,12.4,'2024-04-01 17:01:56'),(16,0.2,'2024-04-03 15:42:29'),(17,9.4,'2024-04-03 15:42:29'),(18,12.3,'2024-04-03 15:42:29'),(19,12.3,'2024-04-03 15:42:29'),(20,12.3,'2024-04-03 15:42:29'),(21,9.4,'2024-04-03 15:42:29'),(22,9.4,'2024-04-03 15:42:29'),(23,9.4,'2024-04-03 15:42:29'),(24,9.4,'2024-04-03 15:42:29'),(25,6.7,'2024-04-03 15:42:29'),(26,6.7,'2024-04-03 15:42:29'),(27,6.7,'2024-04-03 15:42:29'),(28,17.4,'2024-04-03 15:42:29'),(29,17.4,'2024-04-03 15:42:29'),(30,17.4,'2024-04-03 15:42:29'),(31,6.7,'2024-04-03 15:42:29'),(32,17.4,'2024-04-03 15:42:29'),(33,6.7,'2024-04-03 15:42:29'),(34,17.4,'2024-04-03 15:42:29'),(35,6.7,'2024-04-03 15:42:29'),(36,17.4,'2024-04-03 15:42:29'),(37,9.4,'2024-04-03 15:42:29'),(38,9.4,'2024-04-03 15:42:29'),(39,9.4,'2024-04-03 15:42:29'),(40,9.4,'2024-04-03 15:42:29'),(41,9.4,'2024-04-03 15:42:29'),(42,17.4,'2024-04-03 15:42:29'),(43,1,'2024-04-03 15:42:29'),(44,-30,'2024-04-03 15:42:29'),(45,6,'2024-04-03 15:42:29'),(46,5,'2024-04-03 15:42:29'),(47,4,'2024-04-03 15:42:29'),(48,3,'2024-04-03 15:42:29'),(49,2,'2024-04-03 15:42:29'),(50,1,'2024-04-03 15:42:29');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
