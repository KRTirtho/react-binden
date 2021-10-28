/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
    Field,
    Input,
    Form,
    useModel,
    useForm,
    useValidatorChain,
    Select,
    Textarea,
} from 'react-binden';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    Form,
    Field,
    Input,
    Textarea,
    Select,
    regex: {},
    useModel,
    useForm,
    useValidatorChain,
};

export default ReactLiveScope;
