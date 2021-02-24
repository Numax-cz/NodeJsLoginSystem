-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Stř 24. úno 2021, 16:28
-- Verze serveru: 10.4.17-MariaDB
-- Verze PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `test`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `blog`
--

CREATE TABLE `blog` (
  `id` int(10) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `date` varchar(20) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `nameother` varchar(100) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
