/**
 * Abstract Base Service demonstrating OOP Abstraction and Inheritance.
 * All domain services inherit common logging and status tracking functionality.
 */
export abstract class BaseService {
  protected serviceName: string;
  protected createdAt: Date;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.createdAt = new Date();
  }

  public getServiceName(): string {
    return this.serviceName;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Abstract method that derived service classes must implement.
   */
  public abstract validate(): boolean;
}
