class Activity {
  district: string;
  useToActivity: string;
  activityTime: number;
  activityName: string;
  activityDetail: string;
  activityType: string[];
  activityImage: string[];
  address: string;
  addressDetail: string;
  latitude: number;
  longitude: number;
  facilityFood: string[];
  facilityTravel: string[];
  facilityOther: string[];
  limit: string;
  price: string;
  time: number;

  constructor(
    district: string,
    useToActivity: string,
    activityTime: number,
    activityName: string,
    activityDetail: string,
    activityType: string[],
    activityImage: string[],
    address: string,
    latitude: number,
    longitude: number,
    facilityFood: string[],
    facilityTravel: string[],
    facilityOther: string[],
    limit: string,
    price: string,
    time: number,
    addressDetail: string
  ) {
    this.time = time;
    this.district = district;
    this.useToActivity = useToActivity;
    this.activityTime = activityTime;
    this.activityName = activityName;
    this.activityDetail = activityDetail;
    this.activityType = activityType;
    this.activityImage = activityImage;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.facilityFood = facilityFood;
    this.facilityTravel = facilityTravel;
    this.facilityOther = facilityOther;
    this.limit = limit;
    this.price = price;
    this.addressDetail = addressDetail;
  }
}

const activity: Activity[] = [
  new Activity(
    "",
    "",
    0,
    "",
    "",
    [],
    ["", "", "", "", "", ""],
    "",
    13.736717,
    100.523186,
    [],
    [],
    [],
    "",
    "",
    0,
    ""
  ),
];

export { activity, Activity };
