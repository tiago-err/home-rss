export interface IMovieResult {
	Code: string;
	PremiereDate: string;
	ImageUrl: string;
	Link: string;
	Name: string;
	NameWithFormatAndVersion: string;
	Properties: IMovieResultProperties[];
}

export interface IMovieResultProperties {
	Code: string;
	Name: string;
	Value: string;
}

export interface IMovie {
	code: string;
	premiereDate: Date;
	image: string;
	link: string;
	name: string;
	formattedName: string;
	ageRating: string;
	duration: number;
	gender: string;
	trailer: string;
}
