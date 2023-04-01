<?php

namespace App\Service;

use DateTimeImmutable;

class JWTService
{
    public function generate(array $payload, string $secret, int $validity = 21600): string
    {
        $header = ['typ' => 'JWT', 'alg' => 'HS256'];

        if ($validity > 0) {
            $now = new DateTimeImmutable();
            $exp = $now->getTimestamp() + $validity;

            $payload['iat'] = $now->getTimestamp();
            $payload['exp'] = $exp;
        }

        $base64Header = base64_encode(json_encode($header));
        $base64Payload = base64_encode(json_encode($payload));

        $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], $base64Header);
        $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], $base64Payload);

        $secret = base64_encode($secret);

        $signature = hash_hmac('sha256', $base64Header . '.' . $base64Payload, $secret, true);

        $base64Signature = base64_encode($signature);

        $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], $base64Signature);

        return $base64Header . '.' . $base64Payload . '.' . $base64Signature;
    }

    public function isValid(string $token): bool
    {
        return preg_match(
                '/^[a-zA-Z0-9\-\_\=]+\.[a-zA-Z0-9\-\_\=]+\.[a-zA-Z0-9\-\_\=]+$/',
                $token
            ) === 1;
    }

    public function getPayload(string $token): array|null
    {
        $array = explode('.', $token);

        if (count($array) > 1) {
            return json_decode(base64_decode($array[1]), true);
        } else {
            return null;
        }
    }

    public function getHeader(string $token): array|null
    {
        $array = explode('.', $token);

        if (count($array) > 0) {
            return json_decode(base64_decode($array[0]), true);
        } else {
            return null;
        }
    }

    public function getExpirationDate(string $token, string $format = 'd/m/y H:i'): string|null
    {
        $tokenPayload = $this->getPayload($token);

        if (!$tokenPayload || !array_key_exists('exp', $tokenPayload)) {
            return null;
        } else {
            return date($format, $tokenPayload['exp']);
        }
    }

    public function getExpirationDelay(string $token, string $format = 'H:i'): string|null
    {
        $tokenPayload = $this->getPayload($token);

        if (!$tokenPayload || !array_key_exists('exp', $tokenPayload)) {
            return null;
        } else {
            $now = new DateTimeImmutable();
            $tokenExpirationDelay = $tokenPayload['exp'] - $now->getTimestamp();

            return date($format, $tokenExpirationDelay);
        }
    }

    public function isExpired(string $token): bool
    {
        $payload = $this->getPayload($token);
        $now = new DateTimeImmutable();

        if (!$payload || !array_key_exists('exp', $payload)) {
            return false;
        } else {
            return $payload['exp'] < $now->getTimestamp();
        }
    }

    public function check(string $token, string $secret): bool
    {
        $payload = $this->getPayload($token);

        if ($payload === null) {
            return false;
        }

        $verifToken = $this->generate($payload, $secret, 0);

        return $token === $verifToken;
    }
}