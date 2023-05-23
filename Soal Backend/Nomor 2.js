function checkError() {
  let error;

  if (!OK(Run1())) {
    error = Run1Err;
    return error;
  }

  if (!OK(Run2())) {
    error = Run2Err;
    return error;
  }

  if (!OK(Run3())) {
    error = Run3Err;
    return error;
  }

  if (!OK(Run4())) {
    error = Run4Err;
    return error;
  }

  const result = "sukses";
  return result;
}
