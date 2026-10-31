import { randomUUID } from "crypto";
import type {
  Customer,
  CreateCustomerInput,
} from "../types/customer.types";

let customers: Customer[] = [];

export const createCustomer = (data: CreateCustomerInput): Customer => {
  const customer: Customer = {
    id: randomUUID(),
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    createdAt: new Date(),
  };

  customers.push(customer);
  return customer;
};

export const getAllCustomers = (): Customer[] => {
  return customers;
};

export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find((customer) => customer.id === id);
};

export const updateCustomer = (
  id: string,
  data: Partial<CreateCustomerInput>
): Customer | null => {
  const customer = customers.find((customer) => customer.id === id);

  if (!customer) return null;

  if (data.name !== undefined) customer.name = data.name;
  if (data.phone !== undefined) customer.phone = data.phone;
  if (data.email !== undefined) customer.email = data.email;
  if (data.address !== undefined) customer.address = data.address;

  return customer;
};

export const deleteCustomer = (id: string): boolean => {
  const exists = customers.some((customer) => customer.id === id);

  if (!exists) return false;

  customers = customers.filter((customer) => customer.id !== id);
  return true;
};