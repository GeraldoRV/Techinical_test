 /*
Given the Archive, Drawer, Document and Appendix data structures, 
where one Archive has one or more Drawers, one Drawer has 0 to many Documents 
and one Document has 0 to many Appendixes, perfom the next queries:
*/

-- Exercise 1: Obtain the position of all documents archived in 2014 

SELECT position 
FROM drawer 
INNER JOIN document
ON drawer.id = document.drawer_id
WHERE archived_date >= '01/01/2014'
AND archived_date < '01/01/2015';

-- Exercise 2: Obtain the position of all documents archived in 2014 adding the titles from their Appendixes of type 'bill' in case they exist. 

SELECT position, appendix.title
FROM drawer
INNER JOIN document 
ON drawer.id = document.drawer_id
INNER JOIN appendix 
ON document.id = document_id
WHERE document.archived_date >= '01/01/2014'
AND document.archived_date < '01/01/2015'
AND appendix_type  = 'bill';


-- Exercise 3: Count the number of documents that have at least one Appendix of type 'bill'.

SELECT  count(*)
FROM document d
WHERE EXISTS (SELECT *
			  FROM appendix
			  WHERE d.id = document_id
			  AND appendix_type = 'bill');


-- Exercise 4: Obtain the position of all documents and their last Appendix of type 'bill' if they exist.

SELECT position, appendix.title
FROM drawer 
INNER JOIN document 
ON drawer.id = document.drawer_id
INNER JOIN appendix 
ON document.id = document_id
WHERE appendix.archived_date IN (SELECT max(archived_date)
							   	from appendix
					   			WHERE document_id = document.id
							  	AND appendix_type = 'bill')


