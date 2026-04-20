import React, { useState, useEffect } from 'react';
import { Box, Text, Container, Card, Grid, Stack, Image, Dialog, Button } from "@chakra-ui/react";
import CButton from './Button';

interface AccountCardProps {
    image?: string;
    name?: string;
    email?: string;
}