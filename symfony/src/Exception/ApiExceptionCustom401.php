<?php

namespace App\Exception;

use Exception;

final class ApiExceptionCustom401 extends Exception
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