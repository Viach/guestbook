
# PostgreSQL manages concurrency through a system known as
# multiversion concurrency control (MVCC),
# which gives each transaction a "snapshot" of the database,
# allowing changes to be made without being visible to other transactions
# until the changes are committed.

# For best performance you should use PostgreSQL on production server:
# postgresql://apana:trana@localhost/mydatabase

SQLALCHEMY_DATABASE_URI = 'sqlite:///guestbook.db'   # Use SQLite for developing mode only

DEBUG = False
