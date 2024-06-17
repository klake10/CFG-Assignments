-- My scenario: Krystals Music Shop has so many albums and this shop needs to stay organised. 
-- A new database was created to manage info about the music albums, artists and customer orders. 
-- The database is broken into 3 tables: Artists, Albums and Orders and now the shop is ready to thrive!

-- Queries to use for my DB

-- Retrieve all albums sorted by title
SELECT * FROM Albums ORDER BY Title;

-- Retrieve all orders sorted by order date
SELECT * FROM Orders ORDER BY OrderDate;

-- Retrieve all artists sorted by last name
SELECT * FROM Artists ORDER BY LastName;

-- Retrieve albums and their artists
SELECT Albums.Title, Artists.FirstName, Artists.LastName
FROM Albums
JOIN Artists ON Albums.ArtistID = Artists.ArtistID
ORDER BY Albums.Title;

-- Retrieve orders with album titles and total amount
SELECT Orders.OrderID, Albums.Title, Orders.Quantity, Orders.TotalAmount
FROM Orders
JOIN Albums ON Orders.AlbumID = Albums.AlbumID
ORDER BY Orders.OrderDate;

-- Delete an order
DELETE FROM Orders WHERE OrderID = 1;

-- Count the total number of albums
SELECT COUNT(*) AS TotalAlbums FROM Albums;

-- Calculate the average price of albums
SELECT AVG(Price) AS AverageAlbumPrice FROM Albums;

-- Retrieve albums with titles and make them uppercase
SELECT UPPER(Title) AS UppercaseTitle FROM Albums ORDER BY Title;

-- Retrieve the length of each album title
SELECT Title, LENGTH(Title) AS TitleLength FROM Albums ORDER BY Title;

-- Stored procedure to grab albums by a specific artist
DELIMITER //

CREATE PROCEDURE GetAlbumsByArtist(IN ArtistName VARCHAR(100))
BEGIN
    SELECT Albums.Title, Albums.Genre, Albums.ReleaseDate
    FROM Albums
    JOIN Artists ON Albums.ArtistID = Artists.ArtistID
    WHERE CONCAT(Artists.FirstName, ' ', Artists.LastName) = ArtistName
    ORDER BY Albums.Title;
END //