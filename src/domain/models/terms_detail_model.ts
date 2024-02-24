export default class Consultation {
  userId: string;
  createdAt: Date;
  term: string;
  definition: string;
  example: string;
  image_url: string;
  origin: string;
  model: "OpenAI" | "Gemini";

  constructor(
    userId: string,
    createdAt: Date,
    term: string,
    definition: string,
    example: string,
    image_url: string,
    origin: string,
    model: "OpenAI" | "Gemini"
  ) {
    this.userId = userId;
    this.createdAt = createdAt;
    this.term = term;
    this.definition = definition;
    this.example = example;
    this.image_url = image_url;
    this.origin = origin;
    this.model = model;
  }

  toObject() {
    return {
      userId: this.userId,
      createdAt: this.createdAt,
      term: this.term,
      definition: this.definition,
      example: this.example,
      image_url: this.image_url,
      origin: this.origin,
      model: this.model,
    };
  }
}
