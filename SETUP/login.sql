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
-- Struktura tabulky `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `login`
--

INSERT INTO `login` (`id`, `username`, `password`) VALUES
(10, 'Admin', '$2b$10$jah3sm4kl5v/2//2Rzopyu7HhE1zDPXefqcyCC/HMA5w9WJO7qdJO');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
