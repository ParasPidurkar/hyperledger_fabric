#!/bin/bash

for file in *
  do
	if  grep -q uchiha $file
	then 
	 echo $file
	fi
  done
exit 0
