/**
 * Enum for input commands used in the system.
 */
enum INPUT_COMMANDS {
  BALANCE = "BALANCE",
  CHECK_IN = "CHECK_IN",
  PRINT_SUMMARY = "PRINT_SUMMARY"
}

/**
 * Enum for different types of passengers.
 */
enum PASSENGER_TYPE {
  ADULT = "ADULT",
  SENIOR_CITIZEN = "SENIOR_CITIZEN",
  KID = "KID"  
}

/**
 * Enum for different station names.
 */
enum STATIONS {
  CENTRAL = "CENTRAL",
  AIRPORT = "AIRPORT"
}

export {
  INPUT_COMMANDS,
  PASSENGER_TYPE,
  STATIONS
}
