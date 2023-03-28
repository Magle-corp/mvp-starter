<?php

namespace App\Service;

use DateTimeImmutable;

class JWTService
{
    /**
     * @param array $header
     * @param array $payload
     * @param string $secret
     * @param int $validity
     * @return string
     */
    public function generate(array $header, array $payload, string $secret, int $validity = 10800): string
    {
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

    /**
     * @param string $token
     * @return bool
     */
    public function isValid(string $token): bool
    {
        return preg_match(
                '/^[a-zA-Z0-9\-\_\=]+\.[a-zA-Z0-9\-\_\=]+\.[a-zA-Z0-9\-\_\=]+$/',
                $token
            ) === 1;
    }

    /**
     * @param string $token
     * @return array|null
     */
    public function getPayload(string $token): array|null
    {
        $array = explode('.', $token);

        if (count($array) > 1) {
            return json_decode(base64_decode($array[1]), true);
        } else {
            return null;
        }
    }

    /**
     * @param string $token
     * @return array|null
     */
    public function getHeader(string $token): array|null
    {
        $array = explode('.', $token);

        if (count($array) > 0) {
            return json_decode(base64_decode($array[0]), true);
        } else {
            return null;
        }
    }

    /**
     * @param string $token
     * @return bool
     */
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

    /**
     * @param string $token
     * @param string $secret
     * @return bool
     */
    public function check(string $token, string $secret): bool
    {
        $header = $this->getHeader($token);
        $payload = $this->getPayload($token);

        if ($header === null || $payload === null) {
            return false;
        }

        $verifToken = $this->generate($header, $payload, $secret, 0);

        return $token === $verifToken;
    }
}