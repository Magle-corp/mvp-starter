<?php

namespace App\Exception;

use Exception;

final class ApiExceptionCustom409 extends Exception
{
    /**
     * @param string $message
     * @return void
     */
    public function setErrorMessage(string $message): void
    {
        $this->message = $message;
    }
}