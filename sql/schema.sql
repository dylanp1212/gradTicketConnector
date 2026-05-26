DROP TABLE IF EXISTS member CASCADE;
CREATE TABLE member(
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb
);

DROP TABLE IF EXISTS listing CASCADE;
CREATE TABLE listing(
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  member UUID NOT NULL REFERENCES member(id) ON DELETE CASCADE,
  data jsonb
);