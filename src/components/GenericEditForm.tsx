import { useForm, Controller } from "react-hook-form";
import type { UseFormReturn, FieldValues, DefaultValues, Path } from "react-hook-form";
import {
    Stack, Grid, Text, Input, Button, HStack,
    RadioGroup, Dialog, Textarea
} from "@chakra-ui/react";
import { FieldMenu } from "./Dropdown";

// --- Field Definitions ---

type BaseField<T> = {
    name: Path<T>;
    label: string;
    colSpan?: string;
};

type TextField<T> = BaseField<T> & {
    type: "text" | "number";
    validation?: Record<string, unknown>;
};

type RadioField<T> = BaseField<T> & {
    type: "radio";
    options: { label: string; value: string }[];
};

type DropdownField<T> = BaseField<T> & {
    type: "dropdown";
    options: string[];
    placeholder?: string;
};

type DateField<T> = BaseField<T> & {
    type: "date";
};

// ← new
type TextareaField<T> = BaseField<T> & {
    type: "textarea";
    rows?: number;
    validation?: Record<string, unknown>;
};

export type FormField<T> = TextField<T> | RadioField<T> | DropdownField<T> | DateField<T> | TextareaField<T>;

// --- GenericEditForm Props ---

type GenericEditFormProps<T extends FieldValues> = {
    defaultValues: DefaultValues<T>;
    fields: FormField<T>[];
    onSubmit: (data: T) => void;
    onClose: () => void;
    submitLabel?: string;
    cancelLabel?: string;
};

// --- Reusable Field Renderer ---

function renderField<T extends FieldValues>(
    field: FormField<T>,
    form: UseFormReturn<T>
) {
    const { register, control, formState: { errors } } = form;
    const error = errors[field.name];
    const labelCol = field.colSpan ?? "120px 1fr";

    if (field.type === "radio") {
        return (
            <Grid key={String(field.name)} templateColumns={labelCol} alignItems="center" gap={4}>
                <Text fontWeight="semibold" textAlign="right">{field.label}</Text>
                <Controller
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                        <RadioGroup.Root
                            value={controllerField.value}
                            onValueChange={(details) => controllerField.onChange(details.value)}
                            colorPalette="blue"
                        >
                            <HStack gap="6">
                                {field.options.map((opt) => (
                                    <RadioGroup.Item key={opt.value} value={opt.value} pointerEvents="auto">
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator />
                                        <RadioGroup.ItemText>{opt.label}</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                ))}
                            </HStack>
                        </RadioGroup.Root>
                    )}
                />
            </Grid>
        );
    }

    if (field.type === "dropdown") {
        return (
            <Grid key={String(field.name)} templateColumns={labelCol} alignItems="center" gap={4}>
                <Text fontWeight="semibold" textAlign="right">{field.label}</Text>
                <Controller
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                        <FieldMenu
                            value={controllerField.value}
                            onChange={controllerField.onChange}
                            placeholder={field.placeholder}
                            options={field.options}
                        />
                    )}
                />
            </Grid>
        );
    }

    if (field.type === "date") {
        return (
            <Grid key={String(field.name)} templateColumns={labelCol} alignItems="center" gap={4}>
                <Text fontWeight="semibold" textAlign="right">{field.label}</Text>
                <Input type="date" {...register(field.name)} variant="subtle" />
            </Grid>
        );
    }

    // Textarea case
    if (field.type === "textarea") {
        return (
            <Grid key={String(field.name)} templateColumns={labelCol} alignItems="start" gap={4}>
                <Text fontWeight="semibold" textAlign="right" mt={2}>{field.label}</Text>
                <Stack>
                    <Textarea
                        {...register(field.name, field.validation ?? {})}
                        rows={field.rows ?? 4}
                        variant="subtle"
                    />
                    {error && (
                        <Text color="red.400" fontSize="xs">    
                            {error.message as string}
                        </Text>
                    )}
                </Stack>
            </Grid>
        );
    }

    // text | number
    return (
        <Grid key={String(field.name)} templateColumns={labelCol} alignItems="center" gap={4}>
            <Text fontWeight="semibold" textAlign="right" mt={field.type === "text" ? 2 : 0}>
                {field.label}
            </Text>
            <Stack>
                <Input
                    type={field.type}
                    {...register(field.name, field.validation ?? {})}
                    variant="subtle"
                />
                {error && (
                    <Text color="red.400" fontSize="xs">
                        {error.message as string}
                    </Text>
                )}
            </Stack>
        </Grid>
    );
}

// --- GenericEditForm ---

export function GenericEditForm<T extends FieldValues>({
    defaultValues,
    fields,
    onSubmit,
    onClose,
    submitLabel = "Save Changes",
    cancelLabel = "Cancel",
}: GenericEditFormProps<T>) {
    const form = useForm<T>({ defaultValues });

    const handleSubmit = form.handleSubmit((data) => {
        onSubmit(data);
        onClose();
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={4}>
                {fields.map((field) => renderField(field, form))}

                <Grid templateColumns="1fr 1fr" alignItems="center" gap={4}>
                    <Dialog.ActionTrigger asChild>
                        <Button variant="surface">{cancelLabel}</Button>
                    </Dialog.ActionTrigger>
                    <Button type="submit" colorPalette="blue">
                        {submitLabel}
                    </Button>
                </Grid>
            </Stack>
        </form>
    );
}