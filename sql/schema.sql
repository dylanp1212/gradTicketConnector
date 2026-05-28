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

DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message(
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  memberto UUID NOT NULL REFERENCES member(id) ON DELETE CASCADE,
  memberfrom UUID NOT NULL REFERENCES member(id) ON DELETE CASCADE,
  data jsonb
);

DROP TABLE IF EXISTS saved CASCADE;
CREATE TABLE saved(
  member UUID NOT NULL REFERENCES member(id) ON DELETE CASCADE,
  listing UUID NOT NULL REFERENCES listing(id) ON DELETE CASCADE,
  data jsonb,
  PRIMARY KEY (member, listing)
);