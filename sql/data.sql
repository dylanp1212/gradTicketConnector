DELETE FROM member;
INSERT INTO member
VALUES (
  '9e2db315-2413-45e2-afe7-49dfe7ad0e7d',
  jsonb_build_object(
    'email','marty@ucsc.edu',
    'name','Marty Member'
  )
);

INSERT INTO member
VALUES (
  '2266e17f-dbb6-46ac-8e97-0737ac7bbc45',
  jsonb_build_object(
    'email','mark@gmail.com',
    'name','Mark Member'
  )
);


DELETE FROM listing;
INSERT INTO listing
VALUES (
  'a83d592d-9c68-41a1-aa5c-c3257f6f2921',
  '9e2db315-2413-45e2-afe7-49dfe7ad0e7d',
  jsonb_build_object(
    'ceremony','c9',
    'term','Spring 2026',
    'listed', '2026-03-15T06:34:00+00:00'::timestamptz,
    'quantity', 2,
    'title','2 College 9 Grad Tickets',
    'description',E'2 tickets to college 9 graduation\nwilling to give away to first come first serve',
    'method',jsonb_build_array('give'),
    'available','true'::jsonb,
    'verified','true'::jsonb,
    'name','Marty Member'
  )
);

INSERT INTO listing
VALUES (
  '148b8724-3fcb-4bfc-9673-c018fcfc875a',
  '2266e17f-dbb6-46ac-8e97-0737ac7bbc45',
  jsonb_build_object(
    'ceremony','baskin',
    'term','Spring 2026',
    'listed', '2026-04-15T06:34:00+00:00'::timestamptz,
    'quantity', 1,
    'title','1 Baskin graduation ticket',
    'description',E'1 tickets to baskin grad\nasking $25',
    'method',jsonb_build_array('sell'),
    'available','true'::jsonb,
    'verified','false'::jsonb,
    'name','Mark Member'
  )
);

INSERT INTO listing
VALUES (
  '1ae7f648-ae1f-4dc5-afbb-71a629ef7b98',
  '9e2db315-2413-45e2-afe7-49dfe7ad0e7d',
  jsonb_build_object(
    'ceremony','crown',
    'term','Spring 2025',
    'listed', '2025-05-12T06:34:00+00:00'::timestamptz,
    'quantity', 2,
    'title','1 Crown graduation ticket',
    'description',E'2 ticket to crown grad\nwilling to sell or trade\nprice negotiable, hoping for tickets to see friend graduate in Porter',
    'method',jsonb_build_array('sell', 'trade'),
    'available','false'::jsonb,
    'verified','true'::jsonb,
    'name','Marty Member'
  )
);

DELETE FROM message;