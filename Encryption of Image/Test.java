package test;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;

public class Test {

	public static Key generateKey () throws NoSuchAlgorithmException, NoSuchPaddingException {
		KeyGenerator keyGen = KeyGenerator.getInstance("AES");
		Key key = keyGen.generateKey();
		return key;
	}

	public static void main (String arg[])
			throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IOException {
		Key key = generateKey();
		saveKeyToFile("file.txt", key);
		byte[] keyInBytes = key.getEncoded();
		Cipher cipher = Cipher.getInstance("AES");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		CipherInputStream cipherIn = new CipherInputStream(new FileInputStream(new File("computer.png")), cipher);
		FileOutputStream fos = new FileOutputStream(new File("encrypted.jpg"));
		int i;
		while ((i = cipherIn.read()) != -1) {
			fos.write(i);
		}
		fos.close();
	}

	public static void saveKeyToFile (String fileName, Key key) throws IOException {
		byte[] keyInBytes = key.getEncoded();
		BufferedWriter writer = new BufferedWriter(new FileWriter(fileName)); // Convert to hex
		StringBuilder sb = new StringBuilder();
		for (byte b : keyInBytes) {
			sb.append(String.format("%02x", b));
		}
		writer.write(sb.toString());
		writer.flush();
		writer.close();
		System.out.println(sb.toString());
	}
}
