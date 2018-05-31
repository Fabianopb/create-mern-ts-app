#!/usr/bin/env bash
safeRunCommand() {
  typeset cmnd="$*"
  typeset ret_code

  echo cmnd=$cmnd
  eval $cmnd
  ret_code=$?
  if [ $ret_code != 0 ]; then
    printf "Error : [%d] when executing command: '$cmnd'" $ret_code
    exit $ret_code
  fi
}

command="yarn test"

# script starts here
cd backend/

echo "testing backend..."
safeRunCommand "$command"

cd ../frontend

echo "testing frontend..."
safeRunCommand "$command"
