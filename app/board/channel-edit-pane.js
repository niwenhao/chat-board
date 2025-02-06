import React, { useState } from 'react';
import { Description, Field, Label, Input, Textarea, Button } from "@headlessui/react";

export default function ChannelEditPane({ channel, onSaveChannel }) {
    const [name, setName] = useState(channel.name);
    const [description, setDescription] = useState(channel.description);
    const [error, setError] = useState('');

    return (
        <div className="bg-blue-200 p-4">
            <h2 className="text-2xl">Channel Edit</h2>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div>
                <Field>
                    <Label>Name: </Label>
                    <Description>input channel name</Description>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Field>
                <Field>
                    <Label>Description: </Label>
                    <Description>input channel description</Description>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </Field>
            </div>
            <div>
                <Button onClick={() => onSaveChannel({ name, description })}>Save</Button>
            </div>
        </div>
    );
}