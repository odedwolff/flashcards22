


*latest on top

DELIMITER //
CREATE PROCEDURE inc_word(in wordArg char(100))
	BEGIN
		IF NOT (select exists(select * from test_schema_17_oct.words_stats 
			where test_schema_17_oct.words_stats.WORD = wordArg
			))
		THEN
			insert into test_schema_17_oct.words_stats (word, instances_cnt) value(wordArg, 1);
		ELSE
			update test_schema_17_oct.words_stats
			set 
				word = wordArg, 
                instances_cnt = instances_cnt + 1
			where 
				word = wordArg and id <> '8888';
        END IF;    
	END
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE inc_word(in wordArg char(100))
	BEGIN
		IF NOT (select exists(select * from test_schema_17_oct.words_stats 
			where test_schema_17_oct.words_stats.WORD = wordArg
			))
		THEN
			insert into test_schema_17_oct.words_stats (word, instances_cnt) value(wordArg, 1);
		ELSE
			update test_schema_17_oct.words_stats
				set word = wordArg, instances_cnt = instances_cnt + 1
                where word = wordArg;
        END IF;    
	END
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE inc_word(in wordArg char(100))
	BEGIN
		IF (select exists(select * from test_schema_17_oct.words_stats) 
			where word = wordArg
			) 
		THEN
			insert into test_schema_17_oct.words_stats (word, instances_cnt) value(word, 1);
		ELSE
			update test_schema_17_oct.words_stats
				set word = wordArg, instances_cnt = instances_cnt + 1
                where word = wordArg;
        END IF;    
	END
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE inc_word(in word char(100))
	BEGIN
		IF (select exists(select * from test_schema_17_oct.words_stats) ) THEN
			insert into test_schema_17_oct.words_stats (word, instances_cnt) value(word, 1);
		ELSE
			update test_schema_17_oct.words_stats (word, instances_cnt) set values(word, instances_cnt+1);
        END IF;    
	END
//
DELIMITER ;




drop PROCEDURE inc_word;


DELIMITER //
CREATE PROCEDURE inc_word(in word char(100))
	BEGIN
		IF (select exists(select * from test_schema_17_oct.words_stats) ) THEN
			insert into test_schema_17_oct.words_stats (word, instances_cnt) value("non first row", 18);
		ELSE
			insert into test_schema_17_oct.words_stats (word, instances_cnt) value("first first row", 23);
        END IF;    
	END
//
DELIMITER ;


call inc_word('some word 1');

//just a reference
update test_schema_17_oct.words_stats set instances_cnt = instances_cnt + 1 
	where id = 6;









insert into test_schema_17_oct.words_stats (word, instances_cnt) value("me", 1)

SELECT * FROM test_schema_17_oct.words_stats LIMIT 0, 1000


CREATE PROCEDURE inc_word(in word char(100))
	begin
		if
			(select count(*) from test_schema_17_oct.words_stats) > 0 
        then
			insert into test_schema_17_oct.words_stats (word, instances_cnt) value("testWord", 18)
        end if    
	end
