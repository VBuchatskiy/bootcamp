enum skills {
  beginner = 1,
  intermediate = 2,
  advanced = 3
}

interface IBootcamp {
  name: string;
  description: string;
  create_at: number
}

interface ICourse {
  name: string;
  description: string;
  create_at: number;
  skills: string[skills];
  cost: number,
  bid?: string
}

export {
  IBootcamp,
  ICourse
}