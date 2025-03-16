import {z} from "zod";
import {validate_cnpj, validate_cpf} from "@/shared/application/helpers";

export const LoginBodySchema = z.object({
    document: z.string()
        .refine(value => {
            if (validate_cpf(value)) return true
            return validate_cnpj(value);
        }, {
            message: 'É necessário fornecer um documento válido.',
            path: ['document'],
        }).optional(),
    email: z.string().email().optional(),
    password: z.string(),
}).refine(data => data.document || data.email, {
    message: 'É necessário fornecer um e-mail ou um documento.',
    path: ['document', 'email']
});


export type LoginBody = z.infer<typeof LoginBodySchema>

export const LoginResponseSchema = z.object({
    message: z.string(),
    access_token: z.string().optional(),
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>

export const LogoutResponseSchema = z.object({
    message: z.string(),
})

export type LogoutResponse = z.infer<typeof LogoutResponseSchema>