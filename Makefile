DIST_NAME = timing

SCRIPT_FILES = \
	src/IntervalTimer.ts \
	src/index.ts \
	src/AnimationTimer.ts \
	src/TimeoutTimer.ts \
	src/demo.ts \
	test/test.ts

EXTRA_SCRIPTS =

include ./Makefile.microproject
