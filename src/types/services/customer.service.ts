import { randomUUID } from "crypto";
import type { Customer, CreateCustomerInput } from "../types/customer.types";

let customers: Customer[] = [];

export const createCustomer = (data: CreateCustomerInput) => {
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

export const getAllCustomers = () => {
  return customers;
};

export const getCustomerById = (id: string) => {
  return customers.find((customer) => customer.id === id);
};

export const updateCustomer = (
  id: string,
  data: Partial<CreateCustomerInput>
) => {
  const customer = customers.find((customer) => customer.id === id);

  if (!customer) return null;

  Object.assign(customer, data);

  return customer;
};

export const deleteCustomer = (id: string) => {
  const customerExists = customers.some((customer) => customer.id === id);

  if (!customerExists) return false;

  customers = customers.filter((customer) => customer.id !== id);

  return true;
};