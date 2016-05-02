#!/usr/local/bin/python2
import time
import json 
import sys

arr1 = []
arr2 = []
def main():
	count = 0
	one = 0
	var1 = raw_input()
	while var1 != " ":
		print var1
		arr1.append(time.time())
		var1 = raw_input()
	for value in arr1: 
		arr2.append(value - one)
		one = value
	arr2.pop(0)
	for value in arr1:
		print value
	
outputName = sys.argv[-1]
if outputName == sys.argv[0] :
	print "usage:when run me, please add a name of output file as argument after my name..."
	sys.exit(0)
main()
fd = open(outputName,'w')
resultObject = {"rhythm" : arr2}
json.dump(resultObject,fd)
fd.close
print "success born:",outputName
