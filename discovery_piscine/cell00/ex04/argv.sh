#!/bin/bash

if [ $# == 0 ]; then 
	echo "No arguments supplied"
	exit 1
fi

if [ $# == 1 ]; then
	echo "$1"
	exit 1
fi

if [ $# == 2 ]; then
	echo "$1" 
	echo "$2"
else
	echo "$1"
	echo "$2"
	echo "$3"
exit 1
fi
